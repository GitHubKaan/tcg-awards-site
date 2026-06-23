import { ContentBlock } from "./content.types";

/** Renders an editable list of heading/paragraph/spacer blocks. */
function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
    return (
        <>
            {blocks.map((block, i) => {
                switch (block.type) {
                    case "h1":
                        return <h1 key={i}>{block.text}</h1>;
                    case "h3":
                        return (
                            <h3 key={i} className="mb-1 mt-1">
                                {block.text}
                            </h3>
                        );
                    case "spacer":
                        return <br key={i} />;
                    case "p":
                    default:
                        return <p key={i}>{block.text}</p>;
                }
            })}
        </>
    );
}

export default ContentBlocks;
