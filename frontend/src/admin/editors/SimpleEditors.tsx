import {
    CommonContent,
    DownloadsContent,
    FooterContent,
    HeaderContent,
    JuryContent,
    NewsletterContent,
    SponsorsContent,
} from "../../content/content.types";
import {
    CheckboxField,
    ImageField,
    ListEditor,
    NumberField,
    TextArea,
    TextField,
} from "../fields/Fields";

export function CommonEditor({
    value,
    onChange,
}: {
    value: CommonContent;
    onChange: (v: CommonContent) => void;
}) {
    const set = <K extends keyof CommonContent>(k: K, v: CommonContent[K]) =>
        onChange({ ...value, [k]: v });
    return (
        <>
            <ImageField label="Square logo" value={value.logo} onChange={(v) => set("logo", v)} />
            <ImageField label="Wordmark logo" value={value.logoText} onChange={(v) => set("logoText", v)} />
            <TextField label="Nominate URL" value={value.nominateUrl} onChange={(v) => set("nominateUrl", v)} />
            <TextField label="Brand register URL" value={value.brandRegisterUrl} onChange={(v) => set("brandRegisterUrl", v)} />
            <TextField label="Default deadline text" value={value.defaultDeadline} onChange={(v) => set("defaultDeadline", v)} />
        </>
    );
}

export function SponsorsEditor({
    value,
    onChange,
}: {
    value: SponsorsContent;
    onChange: (v: SponsorsContent) => void;
}) {
    return (
        <>
            <TextField label="Heading" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
            <ListEditor
                label="Logos"
                items={value.logos}
                onChange={(logos) => onChange({ ...value, logos })}
                makeNew={() => ({ image: "", alt: "", width: 300 })}
                itemLabel={(l) => l.alt || "Logo"}
                renderItem={(logo, update) => (
                    <>
                        <ImageField label="Image" value={logo.image} onChange={(image) => update({ ...logo, image })} />
                        <TextField label="Alt text" value={logo.alt} onChange={(alt) => update({ ...logo, alt })} />
                        <NumberField label="Width (px)" value={logo.width} onChange={(width) => update({ ...logo, width })} />
                    </>
                )}
            />
        </>
    );
}

export function JuryEditor({
    value,
    onChange,
}: {
    value: JuryContent;
    onChange: (v: JuryContent) => void;
}) {
    return (
        <>
            <CheckboxField
                label="Show the jury on the home page (displayed below the product categories)"
                value={value.enabled}
                onChange={(enabled) => onChange({ ...value, enabled })}
            />
            <TextField label="Title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
            <TextField label="Subtitle" value={value.subtitle} onChange={(subtitle) => onChange({ ...value, subtitle })} />
            <ListEditor
                label="Members"
                items={value.members}
                onChange={(members) => onChange({ ...value, members })}
                makeNew={() => ({ name: "Member Name", role: "Job Title", image: "placeholder.png", description: "" })}
                itemLabel={(m) => m.name || "Member"}
                renderItem={(member, update) => (
                    <>
                        <TextField label="Name" value={member.name} onChange={(name) => update({ ...member, name })} />
                        <TextField label="Role" value={member.role} onChange={(role) => update({ ...member, role })} />
                        <ImageField label="Photo" value={member.image} onChange={(image) => update({ ...member, image })} />
                        <TextArea
                            label="Description (shown in a popup when the card is clicked; leave empty to make the card non-clickable)"
                            value={member.description ?? ""}
                            onChange={(description) => update({ ...member, description })}
                        />
                    </>
                )}
            />
        </>
    );
}

export function DownloadsEditor({
    value,
    onChange,
}: {
    value: DownloadsContent;
    onChange: (v: DownloadsContent) => void;
}) {
    const set = <K extends keyof DownloadsContent>(k: K, v: DownloadsContent[K]) =>
        onChange({ ...value, [k]: v });
    return (
        <>
            <TextField label="Title" value={value.title} onChange={(v) => set("title", v)} />
            <TextField label="Media category title" value={value.mediaCategoryTitle} onChange={(v) => set("mediaCategoryTitle", v)} />
            <TextField label="Download button label" value={value.downloadButtonLabel} onChange={(v) => set("downloadButtonLabel", v)} />
            <TextField label="Download (zip) URL" value={value.zipUrl} onChange={(v) => set("zipUrl", v)} />
            <TextArea label="Note" value={value.note} onChange={(v) => set("note", v)} />
            <ListEditor
                label="Preview images"
                items={value.previews}
                onChange={(previews) => set("previews", previews)}
                makeNew={() => ""}
                itemLabel={(_, i) => `Preview ${i + 1}`}
                renderItem={(img, update) => (
                    <ImageField label="Image" value={img} onChange={(v) => update(v)} />
                )}
            />
        </>
    );
}

export function HeaderEditor({
    value,
    onChange,
}: {
    value: HeaderContent;
    onChange: (v: HeaderContent) => void;
}) {
    return (
        <>
            <TextField label="Brand text" value={value.brand} onChange={(brand) => onChange({ ...value, brand })} />
            <ListEditor
                label="Routes"
                items={value.routes}
                onChange={(routes) => onChange({ ...value, routes })}
                makeNew={() => ({ title: "", path: "/" })}
                itemLabel={(r) => r.title || "Route"}
                renderItem={(route, update) => (
                    <>
                        <TextField label="Title" value={route.title} onChange={(title) => update({ ...route, title })} />
                        <TextField label="Path" value={route.path} onChange={(path) => update({ ...route, path })} />
                    </>
                )}
            />
        </>
    );
}

export function FooterEditor({
    value,
    onChange,
}: {
    value: FooterContent;
    onChange: (v: FooterContent) => void;
}) {
    return (
        <ListEditor
            label="Links"
            items={value.links}
            onChange={(links) => onChange({ ...value, links })}
            makeNew={() => ({ label: "", path: "/" })}
            itemLabel={(l) => l.label || "Link"}
            renderItem={(link, update) => (
                <>
                    <TextField label="Label" value={link.label} onChange={(label) => update({ ...link, label })} />
                    <TextField label="Path" value={link.path} onChange={(path) => update({ ...link, path })} />
                </>
            )}
        />
    );
}

export function NewsletterEditor({
    value,
    onChange,
}: {
    value: NewsletterContent;
    onChange: (v: NewsletterContent) => void;
}) {
    const set = <K extends keyof NewsletterContent>(k: K, v: NewsletterContent[K]) =>
        onChange({ ...value, [k]: v });
    return (
        <>
            <TextField label="Heading" value={value.heading} onChange={(v) => set("heading", v)} />
            <TextField label="First name label" value={value.firstNameLabel} onChange={(v) => set("firstNameLabel", v)} />
            <TextField label="Last name label" value={value.lastNameLabel} onChange={(v) => set("lastNameLabel", v)} />
            <TextField label="Media label" value={value.mediaLabel} onChange={(v) => set("mediaLabel", v)} />
            <TextField label="Link label" value={value.linkLabel} onChange={(v) => set("linkLabel", v)} />
            <TextField label="Country label" value={value.countryLabel} onChange={(v) => set("countryLabel", v)} />
            <TextField label="Email label" value={value.emailLabel} onChange={(v) => set("emailLabel", v)} />
            <TextArea label="Privacy notice (HTML allowed)" value={value.privacyNoticeHtml} onChange={(v) => set("privacyNoticeHtml", v)} />
            <TextField label="Submit button label" value={value.submitLabel} onChange={(v) => set("submitLabel", v)} />
            <TextField label="Form action URL (CleverReach)" value={value.formAction} onChange={(v) => set("formAction", v)} />
        </>
    );
}
