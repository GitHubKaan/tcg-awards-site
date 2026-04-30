import "./downloads.page.css";
import DownloadIcon from "../assets/download_icon.png";

function DownloadsPage() {
    const handleMediaPackDownload = () => {
        const link = document.createElement("a");
        link.href = "/downloads/TCG_Awards_SM_Votes_V1.zip";
        link.download = "TCG_Awards_SM_Votes_V1.zip";
        link.click();
    };


    return (
        <div id="downloads-page" className="default-page">
            <div className="w-100 flex column gap">
                <h1>Downloads</h1>
                
                <h3>Media Category</h3>

                <div className="flex column gap-1">
                    <button className="download-button" onClick={handleMediaPackDownload}>
                        <h5>Vote-Me Media Kit</h5>
                        <img src={DownloadIcon} alt="download icon" width={20} height={20} />
                    </button>

                    <p>Use this kit for your social channels. Free of usage. Please use for promotional purposes only.</p>
                </div>

                {/* <p>See our <Link to="/downloads-tos">Terms of use</Link>.</p> */}
            </div>
        </div>
    );
}

export default DownloadsPage;