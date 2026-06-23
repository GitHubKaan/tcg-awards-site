// Resolves content image strings to a usable URL.
//
//   "https://..."  -> used as-is
//   "/cdn/<file>"  -> served from the backend CDN
//   "/something"   -> a path served by the frontend (e.g. /downloads/x.zip)
//   "logo.png"     -> a bundled asset key (see ASSETS below)

import Logo from "../assets/logo.png";
import LogoText from "../assets/logo_text.png";
import Banner from "../assets/crads_banner.png";
import Placeholder from "../assets/placeholder.png";
import EbayLive from "../assets/sponsors/ebay_live.png";

import Preview1 from "../assets/download_preview/TCG_Awards_SM_Votes_V_1920x1080.jpg";
import Preview2 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1080.jpg";
import Preview3 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1350.jpg";
import Preview4 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1920.jpg";
import Preview5 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1920x1080.jpg";
import Preview6 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1080.jpg";
import Preview7 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1350.jpg";
import Preview8 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1920.jpg";

export const API_BASE = (
    process.env.REACT_APP_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

const ASSETS: Record<string, string> = {
    "logo.png": Logo,
    "logo_text.png": LogoText,
    "crads_banner.png": Banner,
    "placeholder.png": Placeholder,
    "sponsors/ebay_live.png": EbayLive,
    "download_preview/TCG_Awards_SM_Votes_V_1920x1080.jpg": Preview1,
    "download_preview/TCG_Awards_SM_Votes_V1_1080x1080.jpg": Preview2,
    "download_preview/TCG_Awards_SM_Votes_V1_1080x1350.jpg": Preview3,
    "download_preview/TCG_Awards_SM_Votes_V1_1080x1920.jpg": Preview4,
    "download_preview/TCG_Awards_SM_Votes_V1_1920x1080.jpg": Preview5,
    "download_preview/TCG_Awards_SM_Votes_V2_1080x1080.jpg": Preview6,
    "download_preview/TCG_Awards_SM_Votes_V2_1080x1350.jpg": Preview7,
    "download_preview/TCG_Awards_SM_Votes_V2_1080x1920.jpg": Preview8,
};

/** Resolve a content image/url string to something usable in `src`/`href`. */
export function cdnUrl(value?: string): string {
    if (!value) return "";
    if (/^https?:\/\//.test(value)) return value;
    if (value.startsWith("/cdn/")) return `${API_BASE}${value}`;
    if (value.startsWith("/")) return value; // frontend-served path
    return ASSETS[value] ?? value;
}
