import { ReactNode, useState } from "react";
import { cdnUrl } from "../../content/assets";
import { uploadMedia } from "../admin.api";

export function TextField({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <label className="admin-field">
            <span className="admin-field-label">{label}</span>
            <input
                className="admin-input"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
}

export function NumberField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: number;
    onChange: (v: number) => void;
}) {
    return (
        <label className="admin-field">
            <span className="admin-field-label">{label}</span>
            <input
                className="admin-input"
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </label>
    );
}

export function TextArea({
    label,
    value,
    onChange,
    rows = 5,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
}) {
    return (
        <label className="admin-field">
            <span className="admin-field-label">{label}</span>
            <textarea
                className="admin-input admin-textarea"
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
}

export function CheckboxField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <label className="admin-checkbox">
            <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
            <span>{label}</span>
        </label>
    );
}

export function SelectField({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (v: string) => void;
}) {
    return (
        <label className="admin-field">
            <span className="admin-field-label">{label}</span>
            <select className="admin-input" value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

/** Image field: live preview + upload-to-CDN + manual url/asset-key input. */
export function ImageField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onFile(file: File) {
        setUploading(true);
        setError(null);
        try {
            const media = await uploadMedia(file);
            // Store a relative /cdn path so links survive a backend host change.
            const url = new URL(media.url);
            onChange(url.pathname);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="admin-field">
            <span className="admin-field-label">{label}</span>
            <div className="admin-image-row">
                {value ? (
                    <img className="admin-image-preview" src={cdnUrl(value)} alt="preview" />
                ) : (
                    <div className="admin-image-preview admin-image-empty">no image</div>
                )}
                <div className="admin-image-controls">
                    <input
                        className="admin-input"
                        value={value}
                        placeholder="image url, /cdn/… or asset key"
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <label className="admin-btn admin-btn-secondary admin-upload-btn">
                        {uploading ? "Uploading…" : "Upload"}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            disabled={uploading}
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) onFile(f);
                                e.target.value = "";
                            }}
                        />
                    </label>
                </div>
            </div>
            {error && <span className="admin-error-text">{error}</span>}
        </div>
    );
}

/** Generic editable list with add / remove / move controls. */
export function ListEditor<T>({
    label,
    items,
    onChange,
    renderItem,
    makeNew,
    itemLabel,
}: {
    label: string;
    items: T[];
    onChange: (items: T[]) => void;
    renderItem: (item: T, update: (next: T) => void, index: number) => ReactNode;
    makeNew: () => T;
    itemLabel?: (item: T, index: number) => string;
}) {
    function update(index: number, next: T) {
        const copy = items.slice();
        copy[index] = next;
        onChange(copy);
    }
    function remove(index: number) {
        onChange(items.filter((_, i) => i !== index));
    }
    function move(index: number, dir: -1 | 1) {
        const target = index + dir;
        if (target < 0 || target >= items.length) return;
        const copy = items.slice();
        [copy[index], copy[target]] = [copy[target], copy[index]];
        onChange(copy);
    }

    return (
        <div className="admin-list">
            <div className="admin-list-header">
                <span className="admin-field-label">{label}</span>
                <button className="admin-btn admin-btn-secondary" onClick={() => onChange([...items, makeNew()])}>
                    + Add
                </button>
            </div>
            {items.map((item, index) => (
                <div className="admin-list-item" key={index}>
                    <div className="admin-list-item-head">
                        <strong>{itemLabel ? itemLabel(item, index) : `Item ${index + 1}`}</strong>
                        <div className="admin-list-item-actions">
                            <button className="admin-icon-btn" onClick={() => move(index, -1)} title="Move up">↑</button>
                            <button className="admin-icon-btn" onClick={() => move(index, 1)} title="Move down">↓</button>
                            <button className="admin-icon-btn admin-danger" onClick={() => remove(index)} title="Remove">✕</button>
                        </div>
                    </div>
                    {renderItem(item, (next) => update(index, next), index)}
                </div>
            ))}
            {items.length === 0 && <p className="admin-muted">No items yet.</p>}
        </div>
    );
}
