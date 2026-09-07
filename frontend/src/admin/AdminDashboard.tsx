import { useCallback, useEffect, useState } from "react";
import { AuthError, clearToken, getContentKey, getContentMeta, putContentKey } from "./admin.api";
import { EDITOR_GROUP_ORDER, EDITORS, EditorEntry } from "./editors/registry";

/** "12 Mar 2026, 14:30" — locale-aware date + time, or a dash if never saved. */
function formatUpdatedAt(iso: string | null): string {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
    const [active, setActive] = useState<EditorEntry>(EDITORS[0]);

    return (
        <div className="admin-shell">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-head">
                    <strong>TCG Admin</strong>
                    <button
                        className="admin-btn admin-btn-secondary admin-btn-small"
                        onClick={() => {
                            clearToken();
                            onLogout();
                        }}
                    >
                        Log out
                    </button>
                </div>
                <nav className="admin-nav">
                    {EDITOR_GROUP_ORDER.map((group) => {
                        const entries = EDITORS.filter((e) => e.group === group);
                        if (entries.length === 0) return null;
                        return (
                            <div className="admin-nav-group" key={group}>
                                <span className="admin-nav-group-label">{group}</span>
                                {entries.map((entry) => (
                                    <button
                                        key={entry.key}
                                        className={`admin-nav-item ${entry.key === active.key ? "active" : ""}`}
                                        onClick={() => setActive(entry)}
                                    >
                                        {entry.label}
                                    </button>
                                ))}
                            </div>
                        );
                    })}
                </nav>
                <a className="admin-view-site" href="/" target="_blank" rel="noreferrer">
                    View site ↗
                </a>
            </aside>

            <main className="admin-main">
                {/* key=active.key remounts the panel when switching sections */}
                <EditorPanel key={active.key} entry={active} onAuthError={onLogout} />
            </main>
        </div>
    );
}

type Status = { type: "idle" | "saving" | "saved" | "error"; message?: string };

function EditorPanel({ entry, onAuthError }: { entry: EditorEntry; onAuthError: () => void }) {
    const [draft, setDraft] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [dirty, setDirty] = useState(false);
    const [status, setStatus] = useState<Status>({ type: "idle" });
    const [updatedAt, setUpdatedAt] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setUpdatedAt(null);
        getContentMeta(entry.key)
            .then((iso) => {
                if (active) setUpdatedAt(iso);
            })
            .catch(() => {
                /* non-critical: leave the timestamp blank */
            });
        getContentKey(entry.key)
            .then((data) => {
                if (active) {
                    setDraft(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (err instanceof AuthError) onAuthError();
                else if (active) {
                    setStatus({ type: "error", message: "Failed to load content" });
                    setLoading(false);
                }
            });
        return () => {
            active = false;
        };
    }, [entry.key, onAuthError]);

    const update = useCallback((next: unknown) => {
        setDraft(next);
        setDirty(true);
        setStatus({ type: "idle" });
    }, []);

    async function save() {
        setStatus({ type: "saving" });
        try {
            const iso = await putContentKey(entry.key, draft);
            setUpdatedAt(iso);
            setDirty(false);
            setStatus({ type: "saved", message: "Saved" });
        } catch (err) {
            if (err instanceof AuthError) {
                onAuthError();
                return;
            }
            setStatus({ type: "error", message: err instanceof Error ? err.message : "Save failed" });
        }
    }

    if (loading) return <div className="admin-panel-loading">Loading…</div>;

    const { Editor } = entry;

    return (
        <div className="admin-panel">
            <div className="admin-panel-bar">
                <div className="admin-panel-bar-title">
                    <h2>{entry.label}</h2>
                    <span className="admin-panel-updated">
                        Last updated: {formatUpdatedAt(updatedAt)}
                    </span>
                </div>
                <div className="admin-panel-bar-right">
                    {status.type === "saved" && <span className="admin-saved-text">✓ {status.message}</span>}
                    {status.type === "error" && <span className="admin-error-text">{status.message}</span>}
                    <button className="admin-btn" onClick={save} disabled={status.type === "saving" || !dirty}>
                        {status.type === "saving" ? "Saving…" : dirty ? "Save changes" : "Saved"}
                    </button>
                </div>
            </div>
            <div className="admin-panel-body">
                {draft !== null && <Editor value={draft} onChange={update} />}
            </div>
        </div>
    );
}
