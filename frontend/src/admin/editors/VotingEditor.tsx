import { VotingContent } from "../../content/content.types";
import { CheckboxField, ListEditor, TextArea, TextField } from "../fields/Fields";

export default function VotingEditor({
    value,
    onChange,
}: {
    value: VotingContent;
    onChange: (v: VotingContent) => void;
}) {
    const set = <K extends keyof VotingContent>(k: K, v: VotingContent[K]) =>
        onChange({ ...value, [k]: v });
    return (
        <>
            <CheckboxField
                label="Enable final community voting (shows the vote button on the home page and activates the /vote page)"
                value={value.enabled}
                onChange={(v) => set("enabled", v)}
            />
            <TextField label="Home CTA button label" value={value.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
            <TextField label="Deadline text" value={value.ctaDeadline} onChange={(v) => set("ctaDeadline", v)} />
            <TextField label="Page heading" value={value.heading} onChange={(v) => set("heading", v)} />
            <TextArea label="Intro text" value={value.introText} onChange={(v) => set("introText", v)} />
            <TextArea label="Voting note (italic, below category list)" value={value.voteNote} onChange={(v) => set("voteNote", v)} />
            <TextArea label="Details note (above name/email fields)" value={value.detailsNote} onChange={(v) => set("detailsNote", v)} rows={3} />
            <TextField label="Category placeholder option" value={value.placeholderOption} onChange={(v) => set("placeholderOption", v)} />
            <TextField label="First name label" value={value.firstNameLabel} onChange={(v) => set("firstNameLabel", v)} />
            <TextField label="Last name label" value={value.lastNameLabel} onChange={(v) => set("lastNameLabel", v)} />
            <TextField label="Country label" value={value.countryLabel} onChange={(v) => set("countryLabel", v)} />
            <TextField label="Country placeholder option" value={value.countryPlaceholder} onChange={(v) => set("countryPlaceholder", v)} />
            <TextField label="Email label" value={value.emailLabel} onChange={(v) => set("emailLabel", v)} />
            <TextField label="Submit button label" value={value.submitLabel} onChange={(v) => set("submitLabel", v)} />
            <TextField label="Form action URL (CleverReach)" value={value.formAction} onChange={(v) => set("formAction", v)} />
            <ListEditor
                label="Categories"
                items={value.categories}
                onChange={(categories) => set("categories", categories)}
                makeNew={() => ({ label: "New Category", fieldName: "", options: [] })}
                itemLabel={(c) => c.label || "Category"}
                renderItem={(cat, update) => (
                    <>
                        <TextField label="Label" value={cat.label} onChange={(label) => update({ ...cat, label })} />
                        <TextField label="CleverReach field id" value={cat.fieldName} onChange={(fieldName) => update({ ...cat, fieldName })} />
                        <TextArea
                            label="Nominees (one per line)"
                            value={cat.options.join("\n")}
                            onChange={(v) => update({ ...cat, options: v.split("\n") })}
                            rows={7}
                        />
                    </>
                )}
            />
        </>
    );
}
