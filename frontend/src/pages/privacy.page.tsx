import "./privacy.page.css";
import { useContent } from "../content/content.context";
import ContentBlocks from "../content/ContentBlocks";

function PrivacyPage() {
    const { privacy } = useContent();

    return (
        <div id="privacy-page" className="default-page">
            <div className="w-100 flex column">
                <ContentBlocks blocks={privacy.blocks} />
            </div>
        </div>
    );
}

export default PrivacyPage;
