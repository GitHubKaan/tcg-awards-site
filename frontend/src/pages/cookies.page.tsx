import "./cookies.page.css";
import { useNavigate } from "react-router-dom";
import { useContent } from "../content/content.context";
import ContentBlocks from "../content/ContentBlocks";
import { LocalStorage } from "../utils/localStorage.util";
import { LocalStorageKeyType } from "../enums/localStorage.enum";

function CookiesPage() {
    const { cookies } = useContent();
    const navigate = useNavigate();

    // Clears the stored consent so the cookie banner opens again on the home page.
    const resetConsent = () => {
        LocalStorage.delete(LocalStorageKeyType.CookiePreference);
        navigate("/");
    };

    return (
        <div id="cookies-page" className="default-page">
            <div className="w-100 flex column">
                <ContentBlocks blocks={cookies.blocks} />

                <button className="cookies-reset-button no-select" onClick={resetConsent}>
                    Change cookie settings
                </button>
            </div>
        </div>
    );
}

export default CookiesPage;
