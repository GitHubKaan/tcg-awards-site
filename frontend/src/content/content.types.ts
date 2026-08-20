// Shared content model for the TCG Awards site.
//
// Every key below maps to one editable "document" stored in the backend and
// consumed by the frontend. Image fields hold strings that the frontend
// resolves via its `cdnUrl()` helper:
//   - "https://..."        -> used as-is
//   - "/cdn/<file>"        -> served from the backend CDN
//   - "/something"         -> a path served by the frontend itself (e.g. /downloads/x.zip)
//   - "logo.png"           -> a bundled frontend asset key
//
// NOTE: this file is intentionally duplicated in the frontend
// (frontend/src/content/content.types.ts). Keep both copies in sync.

export interface CtaButton {
    label: string;
    /** External/absolute URL opened in a new tab. */
    href?: string;
    /** Internal route navigated to via the router. */
    route?: string;
}

export interface InfoBox {
    titleTop: string;
    titleBottom: string;
    text: string;
}

export interface CommonContent {
    logo: string;
    logoText: string;
    nominateUrl: string;
    brandRegisterUrl: string;
    defaultDeadline: string;
}

export interface HomeNavItem {
    label: string;
    /** Scroll target section index (1-5; 5 = jury) on the home page. */
    section?: number;
    /** Or navigate to a route instead. */
    route?: string;
}

export interface AwardCategory {
    top: string;
    bottom: string;
    image: string;
    /** Hide this single tile on mobile. */
    mobileHidden?: boolean;
}

export interface AwardSection {
    title: string;
    subtitle: string;
    /** Optional sponsor name shown as a modern "Sponsored by …" badge. */
    sponsoredBy?: string;
    cta?: CtaButton;
    deadline?: string;
    /** Grid layout modifier class: "", "quad", "tripple" or "single". */
    gridVariant: "" | "quad" | "tripple" | "single";
    /** Render the last tile separately on mobile (mobile-show duplicate). */
    mobileLastSeparate?: boolean;
    categories: AwardCategory[];
}

export interface SocialsBlock {
    title: string;
    text: string;
    image: string;
}

export interface HomeContent {
    topLogo: string;
    nav: HomeNavItem[];
    whyInfoBox: InfoBox;
    awardsHeading: string;
    awardSections: AwardSection[];
    behindInfoBox: InfoBox;
    socials: SocialsBlock;
}

export interface SponsorLogo {
    image: string;
    alt: string;
    width: number;
    /** Optional link; when set the logo opens this URL in a new tab. */
    href?: string;
}

export interface SponsorTier {
    /** Segment heading, e.g. "Silver Partner". Rendered in a smaller font than the main heading. */
    heading: string;
    logos: SponsorLogo[];
}

export interface SponsorsContent {
    heading: string;
    logos: SponsorLogo[];
    /** Optional partner tiers shown below the main logos (e.g. Silver / Copper Partner). */
    tiers?: SponsorTier[];
}

export interface JuryMember {
    name: string;
    role: string;
    image: string;
    /** Longer bio shown in a modal when the card is clicked. Optional for older stored data. */
    description?: string;
}

export interface JuryContent {
    /** Master switch: the jury section on the home page only shows while true. */
    enabled: boolean;
    title: string;
    subtitle: string;
    members: JuryMember[];
}

export interface DownloadsContent {
    title: string;
    mediaCategoryTitle: string;
    previews: string[];
    downloadButtonLabel: string;
    zipUrl: string;
    note: string;
}

export interface BrandStep {
    label: string;
    text: string;
}

export interface BrandCategory {
    badge: string;
    description: string;
    steps: BrandStep[];
}

export interface BrandCasesInfoContent {
    heroTitle: string;
    heroSpan: string;
    heroText: string;
    ctaText: string;
    ctaButton: CtaButton;
    categories: BrandCategory[];
    evaluationTitle: string;
    evaluationText: string;
    contactLabel: string;
    contactEmail: string;
}

export type ContentBlockType = "h1" | "h2" | "h3" | "p" | "spacer";

export interface ContentBlock {
    type: ContentBlockType;
    text?: string;
}

export interface BlocksContent {
    blocks: ContentBlock[];
}

export interface NavRoute {
    title: string;
    path: string;
}

export interface HeaderContent {
    brand: string;
    routes: NavRoute[];
}

export interface FooterLink {
    label: string;
    path: string;
}

export interface FooterContent {
    links: FooterLink[];
}

export interface NewsletterContent {
    heading: string;
    firstNameLabel: string;
    lastNameLabel: string;
    mediaLabel: string;
    linkLabel: string;
    countryLabel: string;
    emailLabel: string;
    privacyNoticeHtml: string;
    submitLabel: string;
    formAction: string;
}

export interface VotingCategory {
    /** Heading shown above the select, e.g. "Game of the Year". */
    label: string;
    /** CleverReach field id used as the select's `name`, e.g. "1196083". */
    fieldName: string;
    /** One nominee per entry; empty lines are ignored when rendering. */
    options: string[];
}

export interface VotingContent {
    /** Master switch: the final voting page and its home CTA only exist while true. */
    enabled: boolean;
    ctaLabel: string;
    ctaDeadline: string;
    heading: string;
    introText: string;
    voteNote: string;
    detailsNote: string;
    /** First option of every category select, e.g. "Select your vote!". */
    placeholderOption: string;
    firstNameLabel: string;
    lastNameLabel: string;
    countryLabel: string;
    /** First option of the country select, e.g. "Select your country!". */
    countryPlaceholder: string;
    emailLabel: string;
    submitLabel: string;
    formAction: string;
    categories: VotingCategory[];
}

export interface SiteContent {
    common: CommonContent;
    home: HomeContent;
    sponsors: SponsorsContent;
    jury: JuryContent;
    downloads: DownloadsContent;
    brandCasesInfo: BrandCasesInfoContent;
    imprint: BlocksContent;
    privacy: BlocksContent;
    cookies: BlocksContent;
    downloadsTos: BlocksContent;
    header: HeaderContent;
    footer: FooterContent;
    newsletter: NewsletterContent;
    voting: VotingContent;
}

export type ContentKey = keyof SiteContent;

export const CONTENT_KEYS: ContentKey[] = [
    "common",
    "home",
    "sponsors",
    "jury",
    "downloads",
    "brandCasesInfo",
    "imprint",
    "privacy",
    "cookies",
    "downloadsTos",
    "header",
    "footer",
    "newsletter",
    "voting",
];
