import "./downloadsTos.page.css";
import { useContent } from "../content/content.context";
import ContentBlocks from "../content/ContentBlocks";

function DownloadsTosPage() {
    const { downloadsTos } = useContent();

    return (
        <div id="downloads-tos-page" className="default-page">
            <div className="w-100 flex column">
                <ContentBlocks blocks={downloadsTos.blocks} />
            </div>
        </div>
    );
}

export default DownloadsTosPage;
