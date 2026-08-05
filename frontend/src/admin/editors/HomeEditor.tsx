import { AwardCategory, AwardSection, HomeContent } from "../../content/content.types";
import {
    CheckboxField,
    ImageField,
    ListEditor,
    NumberField,
    SelectField,
    TextArea,
    TextField,
} from "../fields/Fields";

const GRID_OPTIONS = [
    { value: "", label: "Default" },
    { value: "quad", label: "Quad" },
    { value: "tripple", label: "Tripple" },
    { value: "single", label: "Single" },
];

export default function HomeEditor({
    value,
    onChange,
}: {
    value: HomeContent;
    onChange: (v: HomeContent) => void;
}) {
    const set = <K extends keyof HomeContent>(k: K, v: HomeContent[K]) => onChange({ ...value, [k]: v });

    return (
        <>
            <ImageField label="Top logo" value={value.topLogo} onChange={(v) => set("topLogo", v)} />

            <ListEditor
                label="Navigation"
                items={value.nav}
                onChange={(nav) => set("nav", nav)}
                makeNew={() => ({ label: "", section: 1 })}
                itemLabel={(n) => n.label || "Nav item"}
                renderItem={(item, update) => (
                    <>
                        <TextField label="Label" value={item.label} onChange={(label) => update({ ...item, label })} />
                        <NumberField
                            label="Scroll to section (1=why, 2=behind, 3=socials, 4=newsletter, 5=jury, 0=none)"
                            value={item.section ?? 0}
                            onChange={(n) => update({ ...item, section: n || undefined })}
                        />
                        <TextField
                            label="Or navigate to route (e.g. /downloads)"
                            value={item.route ?? ""}
                            onChange={(route) => update({ ...item, route: route || undefined })}
                        />
                    </>
                )}
            />

            <fieldset className="admin-fieldset">
                <legend>"Why" info box (section 1)</legend>
                <TextField label="Title top" value={value.whyInfoBox.titleTop} onChange={(titleTop) => set("whyInfoBox", { ...value.whyInfoBox, titleTop })} />
                <TextField label="Title bottom" value={value.whyInfoBox.titleBottom} onChange={(titleBottom) => set("whyInfoBox", { ...value.whyInfoBox, titleBottom })} />
                <TextArea label="Text" rows={10} value={value.whyInfoBox.text} onChange={(text) => set("whyInfoBox", { ...value.whyInfoBox, text })} />
            </fieldset>

            <TextField label="Awards heading" value={value.awardsHeading} onChange={(v) => set("awardsHeading", v)} />

            <ListEditor<AwardSection>
                label="Award sections"
                items={value.awardSections}
                onChange={(awardSections) => set("awardSections", awardSections)}
                makeNew={() => ({ title: "New section", subtitle: "", gridVariant: "", categories: [] })}
                itemLabel={(s) => s.title || "Section"}
                renderItem={(section, update) => (
                    <>
                        <TextField label="Title" value={section.title} onChange={(title) => update({ ...section, title })} />
                        <TextField label="Subtitle" value={section.subtitle} onChange={(subtitle) => update({ ...section, subtitle })} />
                        <SelectField
                            label="Grid layout"
                            value={section.gridVariant}
                            options={GRID_OPTIONS}
                            onChange={(gridVariant) => update({ ...section, gridVariant: gridVariant as AwardSection["gridVariant"] })}
                        />
                        <CheckboxField
                            label="Show last tile separately on mobile"
                            value={!!section.mobileLastSeparate}
                            onChange={(mobileLastSeparate) => update({ ...section, mobileLastSeparate })}
                        />
                        <TextField label="Deadline text (optional)" value={section.deadline ?? ""} onChange={(deadline) => update({ ...section, deadline: deadline || undefined })} />
                        <CheckboxField
                            label="Has call-to-action button"
                            value={!!section.cta}
                            onChange={(has) => update({ ...section, cta: has ? { label: "Nominate now", href: "" } : undefined })}
                        />
                        {section.cta && (
                            <>
                                <TextField label="CTA label" value={section.cta.label} onChange={(label) => update({ ...section, cta: { ...section.cta!, label } })} />
                                <TextField label="CTA external URL" value={section.cta.href ?? ""} onChange={(href) => update({ ...section, cta: { ...section.cta!, href: href || undefined } })} />
                                <TextField label="CTA internal route" value={section.cta.route ?? ""} onChange={(route) => update({ ...section, cta: { ...section.cta!, route: route || undefined } })} />
                            </>
                        )}
                        <ListEditor<AwardCategory>
                            label="Categories (tiles)"
                            items={section.categories}
                            onChange={(categories) => update({ ...section, categories })}
                            makeNew={() => ({ top: "", bottom: "of the year", image: "logo.png" })}
                            itemLabel={(c) => `${c.top} ${c.bottom}`.trim() || "Tile"}
                            renderItem={(cat, updateCat) => (
                                <>
                                    <TextField label="Top text (\\n for line break)" value={cat.top} onChange={(top) => updateCat({ ...cat, top })} />
                                    <TextField label="Bottom text" value={cat.bottom} onChange={(bottom) => updateCat({ ...cat, bottom })} />
                                    <ImageField label="Icon" value={cat.image} onChange={(image) => updateCat({ ...cat, image })} />
                                    <CheckboxField label="Hide on mobile" value={!!cat.mobileHidden} onChange={(mobileHidden) => updateCat({ ...cat, mobileHidden })} />
                                </>
                            )}
                        />
                    </>
                )}
            />

            <fieldset className="admin-fieldset">
                <legend>"Behind" info box (section 2)</legend>
                <TextField label="Title top" value={value.behindInfoBox.titleTop} onChange={(titleTop) => set("behindInfoBox", { ...value.behindInfoBox, titleTop })} />
                <TextField label="Title bottom" value={value.behindInfoBox.titleBottom} onChange={(titleBottom) => set("behindInfoBox", { ...value.behindInfoBox, titleBottom })} />
                <TextArea label="Text" rows={8} value={value.behindInfoBox.text} onChange={(text) => set("behindInfoBox", { ...value.behindInfoBox, text })} />
            </fieldset>

            <fieldset className="admin-fieldset">
                <legend>Socials (section 3)</legend>
                <TextField label="Title" value={value.socials.title} onChange={(title) => set("socials", { ...value.socials, title })} />
                <TextArea label="Text" value={value.socials.text} onChange={(text) => set("socials", { ...value.socials, text })} />
                <ImageField label="Image" value={value.socials.image} onChange={(image) => set("socials", { ...value.socials, image })} />
            </fieldset>
        </>
    );
}
