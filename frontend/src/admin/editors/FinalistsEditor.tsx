import { FinalistsContent } from "../../content/content.types";
import { CheckboxField, ListEditor, TextArea, TextField } from "../fields/Fields";

export default function FinalistsEditor({
    value,
    onChange,
}: {
    value: FinalistsContent;
    onChange: (v: FinalistsContent) => void;
}) {
    const set = <K extends keyof FinalistsContent>(k: K, v: FinalistsContent[K]) =>
        onChange({ ...value, [k]: v });

    return (
        <>
            <CheckboxField
                label="Enable finalists (shows the announcement banner on the home page and activates the /finalists page)"
                value={value.enabled}
                onChange={(v) => set("enabled", v)}
            />

            <fieldset className="admin-fieldset">
                <legend>Home banner</legend>
                <TextField label="Banner badge (eyebrow)" value={value.bannerBadge} onChange={(v) => set("bannerBadge", v)} />
                <TextField label="Banner title" value={value.bannerTitle} onChange={(v) => set("bannerTitle", v)} />
                <TextField label="Banner button label" value={value.bannerCta} onChange={(v) => set("bannerCta", v)} />
            </fieldset>

            <fieldset className="admin-fieldset">
                <legend>Page header</legend>
                <TextField label="Eyebrow" value={value.eyebrow} onChange={(v) => set("eyebrow", v)} />
                <TextField label="Heading" value={value.heading} onChange={(v) => set("heading", v)} />
                <TextArea label="Subheading" value={value.subheading} onChange={(v) => set("subheading", v)} rows={3} />
                <TextArea label="Gala note (gold callout)" value={value.galaNote} onChange={(v) => set("galaNote", v)} rows={3} />
            </fieldset>

            <ListEditor
                label="Intro paragraphs"
                items={value.intro}
                onChange={(intro) => set("intro", intro)}
                makeNew={() => ""}
                itemLabel={(_, i) => `Paragraph ${i + 1}`}
                renderItem={(para, update) => (
                    <TextArea label="Text" value={para} onChange={update} rows={4} />
                )}
            />

            <ListEditor
                label="Award groups"
                items={value.groups}
                onChange={(groups) => set("groups", groups)}
                makeNew={() => ({ kicker: "", heading: "New Group", note: "", categories: [] })}
                itemLabel={(g) => g.heading || "Group"}
                renderItem={(group, update) => (
                    <>
                        <TextField label="Kicker (e.g. Community Awards · Voted by Fans)" value={group.kicker} onChange={(kicker) => update({ ...group, kicker })} />
                        <TextField label="Heading (e.g. Product Excellence)" value={group.heading} onChange={(heading) => update({ ...group, heading })} />
                        <TextField label="Meta note (e.g. Top 3 in alphabetical order)" value={group.note ?? ""} onChange={(note) => update({ ...group, note })} />

                        <ListEditor
                            label="Categories"
                            items={group.categories}
                            onChange={(categories) => update({ ...group, categories })}
                            makeNew={() => ({ title: "New Category", note: "", finalists: [] })}
                            itemLabel={(c) => c.title || "Category"}
                            renderItem={(cat, updateCat) => (
                                <>
                                    <TextField label="Title" value={cat.title} onChange={(title) => updateCat({ ...cat, title })} />
                                    <TextField label="Note (optional description)" value={cat.note ?? ""} onChange={(note) => updateCat({ ...cat, note })} />

                                    <ListEditor
                                        label="Finalists (Top 3)"
                                        items={cat.finalists}
                                        onChange={(finalists) => updateCat({ ...cat, finalists })}
                                        makeNew={() => ({ name: "", detail: "" })}
                                        itemLabel={(f) => f.name || "Finalist"}
                                        renderItem={(fin, updateFin) => (
                                            <>
                                                <TextField label="Name" value={fin.name} onChange={(name) => updateFin({ ...fin, name })} />
                                                <TextField label="Detail (optional: attribution / artist / location)" value={fin.detail ?? ""} onChange={(detail) => updateFin({ ...fin, detail })} />
                                            </>
                                        )}
                                    />
                                </>
                            )}
                        />
                    </>
                )}
            />
        </>
    );
}
