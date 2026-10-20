import { TheEventContent } from "../../content/content.types";
import { TextArea, TextField } from "../fields/Fields";

export default function TheEventEditor({
    value,
    onChange,
}: {
    value: TheEventContent;
    onChange: (v: TheEventContent) => void;
}) {
    const set = <K extends keyof TheEventContent>(k: K, v: TheEventContent[K]) =>
        onChange({ ...value, [k]: v });

    return (
        <>
            <fieldset className="admin-fieldset">
                <legend>Hero</legend>
                <TextField label="Heading" value={value.heroTitle} onChange={(v) => set("heroTitle", v)} />
                <TextField label="Sub-line" value={value.heroText} onChange={(v) => set("heroText", v)} />
            </fieldset>

            <fieldset className="admin-fieldset">
                <legend>Schedule (highlighted, e.g. 6:00 PM – 8:00 PM)</legend>
                <TextField label="Networking time" value={value.networking} onChange={(v) => set("networking", v)} />
                <TextField label="Show time" value={value.showTime} onChange={(v) => set("showTime", v)} />
            </fieldset>

            <fieldset className="admin-fieldset">
                <legend>Info cards</legend>
                <TextField label="Date (e.g. October 22, 2026)" value={value.date} onChange={(v) => set("date", v)} />
                <TextField label="Location (e.g. Messe Essen, Saal Essen)" value={value.location} onChange={(v) => set("location", v)} />
                <TextField label="Dress code (e.g. Business casual)" value={value.dressCode} onChange={(v) => set("dressCode", v)} />
            </fieldset>

            <fieldset className="admin-fieldset">
                <legend>Directions — German</legend>
                <TextField label="Heading" value={value.directionsHeadingDe} onChange={(v) => set("directionsHeadingDe", v)} />
                <TextArea label="Text" value={value.directionsTextDe} onChange={(v) => set("directionsTextDe", v)} />
            </fieldset>

            <fieldset className="admin-fieldset">
                <legend>Directions — English</legend>
                <TextField label="Heading" value={value.directionsHeadingEn} onChange={(v) => set("directionsHeadingEn", v)} />
                <TextArea label="Text" value={value.directionsTextEn} onChange={(v) => set("directionsTextEn", v)} />
            </fieldset>
        </>
    );
}
