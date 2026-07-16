import { BlocksContent, ContentBlock, ContentBlockType } from "../../content/content.types";
import { ListEditor, SelectField, TextArea } from "../fields/Fields";

const TYPE_OPTIONS: { value: ContentBlockType; label: string }[] = [
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
    { value: "p", label: "Paragraph" },
    { value: "spacer", label: "Spacer (blank line)" },
];

export default function BlocksEditor({
    value,
    onChange,
}: {
    value: BlocksContent;
    onChange: (v: BlocksContent) => void;
}) {
    return (
        <ListEditor<ContentBlock>
            label="Content blocks"
            items={value.blocks}
            onChange={(blocks) => onChange({ blocks })}
            makeNew={() => ({ type: "p", text: "" })}
            itemLabel={(b, i) => `${i + 1}. ${b.type}`}
            renderItem={(block, update) => (
                <>
                    <SelectField
                        label="Type"
                        value={block.type}
                        options={TYPE_OPTIONS}
                        onChange={(t) => update({ ...block, type: t as ContentBlockType })}
                    />
                    {block.type !== "spacer" && (
                        <TextArea
                            label="Text"
                            rows={block.type === "p" ? 4 : 2}
                            value={block.text ?? ""}
                            onChange={(text) => update({ ...block, text })}
                        />
                    )}
                </>
            )}
        />
    );
}
