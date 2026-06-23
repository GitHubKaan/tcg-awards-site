import { BrandCasesInfoContent } from "../../content/content.types";
import { ListEditor, TextArea, TextField } from "../fields/Fields";

export default function BrandCasesEditor({
    value,
    onChange,
}: {
    value: BrandCasesInfoContent;
    onChange: (v: BrandCasesInfoContent) => void;
}) {
    const set = <K extends keyof BrandCasesInfoContent>(k: K, v: BrandCasesInfoContent[K]) =>
        onChange({ ...value, [k]: v });

    return (
        <>
            <TextField label="Hero title" value={value.heroTitle} onChange={(v) => set("heroTitle", v)} />
            <TextField label="Hero highlight (span)" value={value.heroSpan} onChange={(v) => set("heroSpan", v)} />
            <TextArea label="Hero text" value={value.heroText} onChange={(v) => set("heroText", v)} />

            <TextArea label="CTA text" value={value.ctaText} onChange={(v) => set("ctaText", v)} rows={2} />
            <TextField label="CTA button label" value={value.ctaButton.label} onChange={(label) => set("ctaButton", { ...value.ctaButton, label })} />
            <TextField label="CTA button URL" value={value.ctaButton.href ?? ""} onChange={(href) => set("ctaButton", { ...value.ctaButton, href })} />

            <ListEditor
                label="Categories"
                items={value.categories}
                onChange={(categories) => set("categories", categories)}
                makeNew={() => ({ badge: "New Category", description: "", steps: [] })}
                itemLabel={(c) => c.badge || "Category"}
                renderItem={(cat, update) => (
                    <>
                        <TextField label="Badge / title" value={cat.badge} onChange={(badge) => update({ ...cat, badge })} />
                        <TextArea label="Description" value={cat.description} onChange={(description) => update({ ...cat, description })} />
                        <ListEditor
                            label="Steps"
                            items={cat.steps}
                            onChange={(steps) => update({ ...cat, steps })}
                            makeNew={() => ({ label: "", text: "" })}
                            itemLabel={(s) => s.label || "Step"}
                            renderItem={(step, updateStep) => (
                                <>
                                    <TextField label="Label" value={step.label} onChange={(label) => updateStep({ ...step, label })} />
                                    <TextArea label="Text" value={step.text} onChange={(text) => updateStep({ ...step, text })} />
                                </>
                            )}
                        />
                    </>
                )}
            />

            <TextField label="Evaluation title" value={value.evaluationTitle} onChange={(v) => set("evaluationTitle", v)} />
            <TextArea label="Evaluation text" value={value.evaluationText} onChange={(v) => set("evaluationText", v)} rows={8} />
            <TextField label="Contact label" value={value.contactLabel} onChange={(v) => set("contactLabel", v)} />
            <TextField label="Contact email" value={value.contactEmail} onChange={(v) => set("contactEmail", v)} />
        </>
    );
}
