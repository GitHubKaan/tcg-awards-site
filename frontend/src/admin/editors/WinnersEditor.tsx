import { WinnersContent } from "../../content/content.types";
import { CheckboxField, ImageField, ListEditor, TextArea, TextField } from "../fields/Fields";

export default function WinnersEditor({
    value,
    onChange,
}: {
    value: WinnersContent;
    onChange: (v: WinnersContent) => void;
}) {
    const set = <K extends keyof WinnersContent>(k: K, v: WinnersContent[K]) =>
        onChange({ ...value, [k]: v });

    return (
        <>
            <CheckboxField
                label="Show is over (hides the countdown/Twitch stream on the home page, shows the thank-you message, and activates the /winners page)"
                value={value.showEnded}
                onChange={(v) => set("showEnded", v)}
            />

            <fieldset className="admin-fieldset">
                <legend>Home thank-you card (shown when the show is over)</legend>
                <TextField label="Title" value={value.endedTitle} onChange={(v) => set("endedTitle", v)} />
                <TextArea label="Text" value={value.endedText} onChange={(v) => set("endedText", v)} rows={4} />
                <TextField label="Button label (links to the winners page)" value={value.bannerCta} onChange={(v) => set("bannerCta", v)} />
            </fieldset>

            <fieldset className="admin-fieldset">
                <legend>Winners page header</legend>
                <TextField label="Eyebrow" value={value.eyebrow} onChange={(v) => set("eyebrow", v)} />
                <TextField label="Heading" value={value.heading} onChange={(v) => set("heading", v)} />
                <TextArea label="Subheading" value={value.subheading} onChange={(v) => set("subheading", v)} rows={3} />
            </fieldset>

            <ListEditor
                label="Winners"
                items={value.winners}
                onChange={(winners) => set("winners", winners)}
                makeNew={() => ({ category: "New Category", image: "", name: "", detail: "" })}
                itemLabel={(w) => w.category || "Winner"}
                renderItem={(w, update) => (
                    <>
                        <TextField label="Category (caption)" value={w.category} onChange={(category) => update({ ...w, category })} />
                        <ImageField label="Winner graphic" value={w.image} onChange={(image) => update({ ...w, image })} />
                        <TextField label="Winner name (optional)" value={w.name ?? ""} onChange={(name) => update({ ...w, name: name || undefined })} />
                        <TextField label="Detail (optional: publisher / attribution)" value={w.detail ?? ""} onChange={(detail) => update({ ...w, detail: detail || undefined })} />
                    </>
                )}
            />
        </>
    );
}
