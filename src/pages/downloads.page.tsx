import "./downloads.page.css";
import { Link } from "react-router-dom";
import DownloadIcon from "../assets/download_icon.png";

function DownloadsPage() {
    const handleMediaPackDownload = () => {
        const link = document.createElement("a");
        link.href = "/downloads/media_pack.zip";
        link.download = "media_pack.zip";
        link.click();
    };


    return (
        <div id="downloads-page" className="default-page">
            <div className="w-100 flex column gap">
                <h1>Downloads</h1>
                
                <button className="download-button" onClick={handleMediaPackDownload}>
                    <h5>Media Pack</h5>
                    <img src={DownloadIcon} alt="download icon" width={20} height={20} />
                </button>

                <p>See our <Link to="/downloads-tos">Terms of use</Link>.</p>
            </div>
        </div>
    );
}

export default DownloadsPage;