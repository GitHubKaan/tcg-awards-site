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
import KayouWhite from "../assets/sponsors/Kayou_White.png";
import GamegenicWhite from "../assets/sponsors/Gamegenic_White.png";

import Preview1 from "../assets/download_preview/TCG_Awards_SM_Votes_V_1920x1080.jpg";
import Preview2 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1080.jpg";
import Preview3 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1350.jpg";
import Preview4 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1920.jpg";
import Preview5 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1920x1080.jpg";
import Preview6 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1080.jpg";
import Preview7 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1350.jpg";
import Preview8 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1920.jpg";

import WinnerCardBack from "../assets/winners/1. TCGA_Card Back.jpg";
import WinnerAccessory from "../assets/winners/TCGA_Accessory.jpg";
import WinnerArtwork from "../assets/winners/TCGA_Artwork.jpg";
import WinnerBrandPartnership from "../assets/winners/TCGA_Brand Partnership.jpg";
import WinnerCampaign from "../assets/winners/TCGA_Campaign.jpg";
import WinnerContentCreator from "../assets/winners/TCGA_Content Creator.jpg";
import WinnerEqualityImpact from "../assets/winners/TCGA_Equality Impact.jpg";
import WinnerEvent from "../assets/winners/TCGA_Event.jpg";
import WinnerGame from "../assets/winners/TCGA_Game.jpg";
import WinnerLgs from "../assets/winners/TCGA_LGS.jpg";
import WinnerNewcomer from "../assets/winners/TCGA_Newcomer.jpg";
import WinnerPlayer from "../assets/winners/TCGA_Player.jpg";
import WinnerServiceProvider from "../assets/winners/TCGA_Service Provider.jpg";
import WinnerSet from "../assets/winners/TCGA_Set.jpg";

export const API_BASE = (
    process.env.REACT_APP_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

const ASSETS: Record<string, string> = {
    "logo.png": Logo,
    "logo_text.png": LogoText,
    "crads_banner.png": Banner,
    "placeholder.png": Placeholder,
    "sponsors/ebay_live.png": EbayLive,
    "sponsors/Kayou_White.png": KayouWhite,
    "sponsors/Gamegenic_White.png": GamegenicWhite,
    "download_preview/TCG_Awards_SM_Votes_V_1920x1080.jpg": Preview1,
    "download_preview/TCG_Awards_SM_Votes_V1_1080x1080.jpg": Preview2,
    "download_preview/TCG_Awards_SM_Votes_V1_1080x1350.jpg": Preview3,
    "download_preview/TCG_Awards_SM_Votes_V1_1080x1920.jpg": Preview4,
    "download_preview/TCG_Awards_SM_Votes_V1_1920x1080.jpg": Preview5,
    "download_preview/TCG_Awards_SM_Votes_V2_1080x1080.jpg": Preview6,
    "download_preview/TCG_Awards_SM_Votes_V2_1080x1350.jpg": Preview7,
    "download_preview/TCG_Awards_SM_Votes_V2_1080x1920.jpg": Preview8,
    "winners/card-back.jpg": WinnerCardBack,
    "winners/accessory.jpg": WinnerAccessory,
    "winners/artwork.jpg": WinnerArtwork,
    "winners/brand-partnership.jpg": WinnerBrandPartnership,
    "winners/campaign.jpg": WinnerCampaign,
    "winners/content-creator.jpg": WinnerContentCreator,
    "winners/equality-impact.jpg": WinnerEqualityImpact,
    "winners/event.jpg": WinnerEvent,
    "winners/game.jpg": WinnerGame,
    "winners/lgs.jpg": WinnerLgs,
    "winners/newcomer.jpg": WinnerNewcomer,
    "winners/player.jpg": WinnerPlayer,
    "winners/service-provider.jpg": WinnerServiceProvider,
    "winners/set.jpg": WinnerSet,
};

/** Resolve a content image/url string to something usable in `src`/`href`. */
export function cdnUrl(value?: string): string {
    if (!value) return "";
    if (/^https?:\/\//.test(value)) return value;
    if (value.startsWith("/cdn/")) return `${API_BASE}${value}`;
    if (value.startsWith("/")) return value; // frontend-served path
    return ASSETS[value] ?? value;
}
