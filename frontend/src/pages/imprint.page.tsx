import "./imprint.page.css";
import { useContent } from "../content/content.context";
import ContentBlocks from "../content/ContentBlocks";

function ImprintPage() {
    const { imprint } = useContent();

    return (
        <div id="imprint-page" className="default-page">
            <div className="w-100 flex column">
                <ContentBlocks blocks={imprint.blocks} />
            </div>
        </div>
    );
}

export default ImprintPage;
