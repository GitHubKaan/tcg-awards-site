// Default site content. This is the single source of truth used to seed the
// database on first run and (as a duplicated copy) as the frontend's offline
// fallback. Image fields use bundled asset keys; uploaded media replaces them
// with /cdn/... URLs.

import { SiteContent } from "./content.types";

export const DEFAULT_CONTENT: SiteContent = {
    common: {
        logo: "logo.png",
        logoText: "logo_text.png",
        nominateUrl: "https://wkf.ms/4uiu77u",
        brandRegisterUrl: "https://wkf.ms/4tlCKOu",
        defaultDeadline: "Submission deadline: July 19, 2026",
    },

    home: {
        topLogo: "logo_text.png",
        nav: [
            { label: "why", section: 1 },
            { label: "the awards", section: 2 },
            { label: "socials", section: 3 },
            { label: "newsletter", section: 4 },
            { label: "downloads", route: "/downloads" },
            { label: "jury", section: 5 },
        ],
        whyInfoBox: {
            titleTop: "WHY WE\nCREATED THE",
            titleBottom: "TCG AWARDS",
            text: `Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retailers, elite players, artists, collectors, event organizers, and content creators. Yet despite its scale, innovation, and cultural impact, there has never been a dedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.

That changes now.

The TCG Awards were created to recognize excellence across the entire Trading Card Game ecosystem — from groundbreaking games and sets to unforgettable events, outstanding local game stores, creators, players, artists, service providers, and industry partnerships.

This is not about popularity alone.
This is about excellence, innovation, community impact, and meaningful contribution.

The awards combine the voice of the global community with the expertise of an independent jury, ensuring that both passion and professional perspective shape the outcome.

By setting a benchmark for quality, creativity, performance, and responsibility — from Game of the Year to Equality Impact of the Year — the TCG Awards celebrate those who elevate the industry and shape its future.`,
        },
        awardsHeading: "TCG Awards",
        awardSections: [
            {
                title: "product excellence",
                subtitle: "voted by community",
                sponsoredBy: "KAYOU",
                cta: { label: "Nominate now", href: "https://wkf.ms/4uiu77u" },
                deadline: "Submission deadline: July 19, 2026",
                gridVariant: "",
                mobileLastSeparate: true,
                categories: [
                    { top: "game", bottom: "of the year", image: "logo.png" },
                    { top: "newcomer", bottom: "of the year", image: "logo.png" },
                    { top: "set", bottom: "of the year", image: "logo.png" },
                    { top: "accessory", bottom: "of the year", image: "logo.png" },
                    { top: "artwork", bottom: "of the year", image: "logo.png" },
                ],
            },
            {
                title: "Community and Creator",
                subtitle: "voted by community",
                cta: { label: "Nominate now", href: "https://wkf.ms/4uiu77u" },
                deadline: "Submission deadline: July 19, 2026",
                gridVariant: "quad",
                mobileLastSeparate: false,
                categories: [
                    { top: "event", bottom: "of the year", image: "logo.png" },
                    { top: "local\ngame store", bottom: "of the year", image: "logo.png" },
                    { top: "content\ncreator", bottom: "of the year", image: "logo.png" },
                    { top: "equality\nimpact", bottom: "of the year", image: "logo.png" },
                ],
            },
            {
                title: "Industry and Business Excellence",
                subtitle: "voted by jury",
                cta: { label: "More info", route: "/brand-cases-info" },
                deadline: "Submission deadline: July 19, 2026",
                gridVariant: "tripple",
                mobileLastSeparate: true,
                categories: [
                    { top: "brand\npartnership", bottom: "of the year", image: "logo.png" },
                    { top: "campaign", bottom: "of the year", image: "logo.png" },
                    { top: "service\nprovider", bottom: "of the year", image: "logo.png" },
                ],
            },
            {
                title: "performance excellence",
                subtitle: "Performance Based Evaluation",
                gridVariant: "single",
                mobileLastSeparate: true,
                categories: [
                    { top: "player", bottom: "of the year", image: "logo.png" },
                ],
            },
        ],
        behindInfoBox: {
            titleTop: "Behind the",
            titleBottom: "TCG Awards",
            text: `The TCG Awards are initiated by Card Sports League GmbH and Hana Sports & Entertainment GmbH in partnership with Merz Verlag, organizer of SPIEL Essen, the worlds largest and most important fair for all tabletop games including trading cards.

The awards combine the voice of the global community with the expertise of an independent jury, ensuring that both passion and professional perspective shape the outcome. Players, fans, and all who are passionate about TCGs can enter cases into the award, as well as industry professionals, such as publishers, agencies, creators and many more. Overall, there will be 13 different categories.`,
        },
        socials: {
            title: "socials",
            text: "Want to stay in the loop? Follow our social media channels and be the first to hear about TCG Awards updates, exclusive insights, and exciting announcements. Join the community!",
            image: "crads_banner.png",
        },
    },

    sponsors: {
        heading: "Presented by",
        logos: [
            { image: "sponsors/ebay_live.png", alt: "ebay live logo", width: 400 },
        ],
        tiers: [
            {
                heading: "Gold Partner",
                logos: [
                    { image: "sponsors/Kayou_White.png", alt: "Kayou logo", width: 220, href: "https://www.kayouofficial.com/en-US" },
                ],
            },
            {
                heading: "Silver Partner",
                logos: [
                    { image: "sponsors/Gamegenic_White.png", alt: "Gamegenic logo", width: 130, href: "https://www.gamegenic.com/" },
                ],
            },
        ],
    },

    jury: {
        enabled: false,
        title: "The Jury",
        subtitle: "Evaluates the Business Cases of the TCG Awards.",
        members: Array.from({ length: 13 }, () => ({
            name: "Member Name",
            role: "Job Title",
            image: "placeholder.png",
            description:
                "Add a short biography here describing this jury member's background, experience, and role within the TCG industry.",
        })),
    },

    downloads: {
        title: "Downloads",
        mediaCategoryTitle: "Media Category",
        previews: [
            "download_preview/TCG_Awards_SM_Votes_V_1920x1080.jpg",
            "download_preview/TCG_Awards_SM_Votes_V1_1080x1080.jpg",
            "download_preview/TCG_Awards_SM_Votes_V1_1080x1350.jpg",
            "download_preview/TCG_Awards_SM_Votes_V1_1080x1920.jpg",
            "download_preview/TCG_Awards_SM_Votes_V1_1920x1080.jpg",
            "download_preview/TCG_Awards_SM_Votes_V2_1080x1080.jpg",
            "download_preview/TCG_Awards_SM_Votes_V2_1080x1350.jpg",
            "download_preview/TCG_Awards_SM_Votes_V2_1080x1920.jpg",
        ],
        downloadButtonLabel: "Download Vote-Me Media Kit",
        zipUrl: "/files/TCG_Awards_SM_Votes_V1.zip",
        note: "Use this kit for your social channels. Free of usage. Please use for promotional purposes only.",
    },

    brandCasesInfo: {
        heroTitle: "Further Information for",
        heroSpan: "Brand Cases",
        heroText:
            "Here you will find everything we will ask for to evaluate your Brand Case. You do not need to have everything ready to register. After registration, there will be a dedicated time window to hand everything in.",
        ctaText: "Ready to submit? Follow the step-by-step directions in the registration process.",
        ctaButton: { label: "Register your Brand Case", href: "https://wkf.ms/4tlCKOu" },
        categories: [
            {
                badge: "Service Provider of the Year",
                description:
                    "The Service Provider of the Year award was designed to celebrate the platform, app, or service that made life easier for players, stores, and organizers — advancing the infrastructure of the TCG ecosystem.",
                steps: [
                    {
                        label: "Basic Information",
                        text: "Please provide us with the basic information around your service, mainly the name of the service, the platform, participating brands and organizations, and served markets and regions.",
                    },
                    {
                        label: "Service Overview",
                        text: "Please describe the core functionality and key features of your service. Which category are you active in (marketplace, pricing tool, grading service, logistics, etc.)? Who is your target audience (players, retailers, publishers, collectors, etc.)? Which problem does your service address and why is it important to solve?",
                    },
                    {
                        label: "Product and Execution",
                        text: "Please describe the key features and functionality you deliver. Are there any integrations with existing platforms or services? How scalable and reliable is your service? What does your customer support or service model look like?",
                    },
                    {
                        label: "Adoption, Usage, and Impact Metrics",
                        text: "Can you please help us understand which metrics you measure and how you measure success? How many people use your service? What is your business impact?",
                    },
                    {
                        label: "Strategic Value",
                        text: "What is your product's long-term impact on the TCG industry, game or ecosystem? Did you implement any new technologies or innovation? What makes your service unique and how do you differentiate from existing competitors? Why will your service be long-term relevant for the industry?",
                    },
                ],
            },
            {
                badge: "Campaign of the Year",
                description:
                    "The Campaign of the Year award was designed to celebrate the most outstanding marketing campaign in the TCG industry combining strategy, storytelling, and measurable impact.",
                steps: [
                    {
                        label: "Basic Information",
                        text: "Please provide us with the basic information around the campaign, mainly the name of the campaign, participating brands and organizations, the duration and targeted markets and regions.",
                    },
                    {
                        label: "Campaign Objectives",
                        text: "Please describe the objective of the campaign. Why did you launch it? What was your desired objective (e.g. brand awareness, player acquisition, etc.) and which target group did you try to reach? How did you segment your target group? What was your core creative concept behind the campaign?",
                    },
                    {
                        label: "Campaign Execution",
                        text: "Which measures did you take to achieve your desired objectives? Which channels did you use for communication? Did you use creator partnerships, event or retail activations? Which mediums did you use, e.g. video and livestreaming?",
                    },
                    {
                        label: "Impact Metrics",
                        text: "Can you please help us understand which metrics you measured and how you measured success? This can reach from business impact, like revenue, sales territory expansion or market entries to hard metrics like total reach, participation, and engagement metrics. If you have any insight into media coverage or earned media value, this will also help better understand the impact of the partnership.",
                    },
                    {
                        label: "Strategic Value",
                        text: "What is the campaign's long-term impact on your brand, game or ecosystem? How does this campaign help to provide value to the TCG player and fan base? Did you create any new standards or add innovative features to the industry?",
                    },
                ],
            },
            {
                badge: "Brand Partnership of the Year",
                description:
                    "The Brand Partnership of the Year award was designed to celebrate the most impactful collaboration between brands — recognizing partnerships that elevated creativity, reach, and cultural relevance.",
                steps: [
                    {
                        label: "Basic Information",
                        text: "Please provide us with the basic information around the partnership, mainly the name of the partnership, participating brands and organizations, the duration and targeted markets and regions.",
                    },
                    {
                        label: "Strategic Context",
                        text: "Please describe the strategic context of this partnership. What was its objective? Which challenge or opportunity did the collaboration address? Why did it make sense and who was it built for — who was the target audience?",
                    },
                    {
                        label: "Partnership Structure",
                        text: "What is the nature and scope of this partnership? For example, a licensing deal, co-branding, distribution partnership, retail integration, event, creator collaboration, and so on. Which role did each of the parties play in this partnership?",
                    },
                    {
                        label: "Impact Metrics",
                        text: "Can you please help us understand which metrics you measured and how you measured success? This can reach from business impact, like revenue, sales territory expansion or market entries to hard metrics like total reach, participation, and engagement metrics. If you have any insight into media coverage or earned media value, this will also help us better understand the impact of the partnership.",
                    },
                    {
                        label: "Strategic Value",
                        text: "What is the partnership's long-term impact on your brands, game or ecosystem? How does this partnership help to provide value to the TCG player and fan base? Did you create any new standards or add innovative features to the industry?",
                    },
                ],
            },
        ],
        evaluationTitle: "Evaluation Criteria",
        evaluationText:
            "Not all information listed in the submission form is mandatory. However, the award will be evaluated by an independent expert jury with professional industry experience. Providing clear context, supporting data, and measurable results will help the jury better understand the scope and impact of your initiative and enable a fair and informed evaluation. Submissions that include relevant metrics and supporting information are therefore strongly encouraged. Our jury will sign an NDA to make sure information provided will not be shared and only be used for the evaluation process. You can optionally add any supporting materials you have to your submission, like a partnership deck, video, links, visual assets, etc. To reduce workload on our jury, if you do add materials, please make sure they are structured and make it easy to extract relevant information.",
        contactLabel: "Questions?",
        contactEmail: "cases@tcg-awards.com",
    },

    imprint: {
        blocks: [
            { type: "h1", text: "Imprint" },
            { type: "p", text: "Information in accordance with § 5 TMG" },
            { type: "spacer" },
            { type: "p", text: "Card Sports League GmbH" },
            { type: "p", text: "Kieler Straße 3" },
            { type: "p", text: "15732 Schulzendorf" },
            { type: "p", text: "Amtsgericht: Cottbus" },
            { type: "p", text: "Handelsregister: HRB 16886 CB" },
            { type: "spacer" },
            { type: "p", text: "Merz Verlag GmbH & Co. KG" },
            { type: "p", text: "Huyssenallee 105" },
            { type: "p", text: "45128 Essen" },
            { type: "spacer" },
            { type: "p", text: "Hana Sports & Entertainment GmbH" },
            { type: "p", text: "Speichergracht 10" },
            { type: "p", text: "47051 Duisburg" },
            { type: "spacer" },
            { type: "p", text: "Represented by" },
            { type: "p", text: "Norman Wilde (norman@csl.tv)," },
            { type: "p", text: "Ali Fawaz (ali@csl.tv)" },
            { type: "spacer" },
            { type: "p", text: "Disclaimer" },
            { type: "spacer" },
            { type: "p", text: "Accountability for content" },
            { type: "p", text: "The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this matter, please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity. Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG)." },
            { type: "spacer" },
            { type: "p", text: "Accountability for links" },
            { type: "p", text: "Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately." },
            { type: "spacer" },
            { type: "p", text: "Copyright Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work are only allowed for private use. The materials from these pages are copyrighted and any unauthorized use may violate copyright laws. Quelle: Übersetzungsbüro translate-24h.de" },
        ],
    },

    privacy: {
        blocks: [
            { type: "h1", text: "Privacy Policy" },
            { type: "p", text: "Data protection" },
            { type: "h3", text: "§ 1 Information on the collection of personal data" },
            { type: "p", text: "(1) In the following we inform you about the collection of personal data when using our website. Personal data includes all data that can be related to you personally, e.g. name, address, e-mail addresses, user behavior." },
            { type: "spacer" },
            { type: "p", text: "(2) Responsible according to Art. 4 para. 7 EU Data Protection Basic Regulation (DS-GVO) is" },
            { type: "spacer" },
            { type: "p", text: "Card Sports League GmbH" },
            { type: "p", text: "Kieler Straße 3" },
            { type: "p", text: "15732 Schulzendorf" },
            { type: "p", text: "Amtsgericht: Cottbus" },
            { type: "p", text: "Handelsregister: HRB 16886 CB" },
            { type: "p", text: "Norman Wilde (norman@csl.tv)," },
            { type: "p", text: "Ali Fawaz (ali@csl.tv)" },
            { type: "spacer" },
            { type: "p", text: "(3) When you contact us by e-mail or via a contact form, we will store the data you provide (your e-mail address, possibly your name and telephone number) in order to answer your questions. We will delete the data that arises in this context after the storage of such is no longer required, or restrict processing in the case that there are legal storage obligations." },
            { type: "spacer" },
            { type: "p", text: "(4) If we use contracted service providers for individual functions of our offer or would like to use your data for advertising purposes, we will inform you below in detail about the respective processes. We will also specify the criteria for the storage period." },
            { type: "h3", text: "§ 2 Your rights" },
            { type: "p", text: "(1) You have the following rights towards us with regard to your personal data:" },
            { type: "spacer" },
            { type: "p", text: "Right to information," },
            { type: "p", text: "Right to rectification or deletion," },
            { type: "p", text: "Right to restrict processing," },
            { type: "p", text: "Right to object to processing, § 5," },
            { type: "p", text: "Right to data transferability." },
            { type: "spacer" },
            { type: "p", text: "(2) You also have the right to complain to a data protection supervisory authority about the processing of your personal data by us." },
            { type: "h3", text: "§ 3 Collection of personal data when you visit our website" },
            { type: "p", text: "(1) If you are using the website for informational purposes only, i.e. if you do not register or otherwise provide us with information, we only collect the personal data that your browser transmits to our server. If you wish to view our website, we collect the following data, which is technically necessary for us to display our website to you and to guarantee stability and security (legal basis is Art. 6 Para. 1 S. 1 lit. f DS-GVO):" },
            { type: "spacer" },
            { type: "p", text: "IP address" },
            { type: "p", text: "Data and time of inquiry" },
            { type: "p", text: "Time zone difference to Greenwich Mean Time (GMT)" },
            { type: "p", text: "Content of the request (specific page)" },
            { type: "p", text: "Access status/HTTP status code" },
            { type: "p", text: "Amount of data transferred in each case" },
            { type: "p", text: "Website from which the request originates" },
            { type: "p", text: "Browser" },
            { type: "p", text: "Operating system and its interface" },
            { type: "p", text: "Language and version of browser software." },
            { type: "spacer" },
            { type: "p", text: "(2) In addition to the aforementioned data, cookies are stored on your terminal device when you use our website. Cookies are small text files that are stored in your memory assigned to the browser you are using and through which certain information flows to the location that sets the cookie (in this case to us). Cookies cannot execute programs or transmit viruses to your computer. They serve to make the website more user-friendly and effective." },
            { type: "spacer" },
            { type: "p", text: "(3) Use of cookies:" },
            { type: "spacer" },
            { type: "p", text: "a) This website uses the following types of cookies, the scope and functionality of which are explained below:" },
            { type: "spacer" },
            { type: "p", text: "Transient cookies (to b)" },
            { type: "spacer" },
            { type: "p", text: "Persistent cookies (to c)." },
            { type: "spacer" },
            { type: "p", text: "b) Transient cookies are automatically deleted when you close your browser. These include in particular session cookies. They store a so-called session ID, which can be used to assign various requests from your browser to the shared session. This enables your computer to be recognized when you return to our website. The session cookies are deleted when you log out or close your browser." },
            { type: "spacer" },
            { type: "p", text: "c) Persistent cookies are automatically deleted after a specified period, which may vary depending on the cookie. You can delete cookies at any time in the security settings of your browser." },
            { type: "spacer" },
            { type: "p", text: "d) You can configure your browser settings according to your wishes and, for example, refuse the acceptance of third-party cookies or all cookies. We would like to point out that you then may not be able to use all the functions of this website." },
            { type: "spacer" },
            { type: "p", text: "e) We use cookies to identify you for subsequent visits if you have an account with us. Otherwise you will have to log in again for each visit." },
            { type: "spacer" },
            { type: "p", text: "f) The Flash cookies used are not captured by your browser, but by your Flash plug-in. We also use HTML5 storage objects that are stored on your device. These objects store the required data regardless of the browser you are using and do not have an automatic expiration date. If you do not want the Flash cookies to be processed, you must install an appropriate add-on, e.g. “Better Privacy” for Mozilla Firefox (https://addons.mozilla.org/de/firefox/addon/betterprivacy/) or the Adobe Flash Killer cookie for Google Chrome. You can prevent the use of HTML5 storage objects by using private mode in your browser. We also recommend that you regularly delete your cookies and browser history manually." },
            { type: "h3", text: "§ 4 Data security" },
            { type: "p", text: "Within the scope of the website visit, we use the common SSL (Secure Socket Layer) method in connection with the highest level of encryption supported by your browser. This is generally a 256-bit encryption. If your browser does not support 256-bit encryption, we use 128-bit v3 technology instead. You can tell whether an individual page of our website is transmitted in encrypted form by the closed representation of the key or lock symbol in the lower status bar of your browser." },
            { type: "spacer" },
            { type: "p", text: "We also use appropriate technical and organizational security measures to protect your data against accidental or intentional manipulation, partial or complete loss, destruction or against unauthorized access by third parties. Our security measures are continuously improved in line with technological developments." },
            { type: "h3", text: "§ 5 Right to objection" },
            { type: "p", text: "If your personal data are processed on the basis of legitimate interests pursuant to Art. 6 para. 1 sentence 1 lit. f DSGVO, you have the right, pursuant to Art. 21 DSGVO, to object to the processing of your personal data if there are reasons for doing so which arise from your particular situation or which are directed against direct advertising. In the latter case, you have a general right of objection, which is implemented by us without having to state a particular situation. If you would like to exercise your right to revocation or objection, all you have to do is send an e-mail to norman.wilde@cardsportsleague.com." },
            { type: "h3", text: "§ 6 Actuality and changes to this data protection declaration" },
            { type: "p", text: "This data protection declaration is currently valid and as of November 2018. Due to the further development of our website and offers on it or due to changed legal or official requirements, it may be necessary to amend this data protection declaration. The respective valid data protection declaration can be called up at any time on our website at http://cardsportsleague.com/data-protection and printed out." },
        ],
    },

    cookies: {
        blocks: [
            { type: "h1", text: "Cookie Policy" },
            { type: "p", text: "This Cookie Policy applies to the TCG Awards website and supplements our Privacy Policy." },
            { type: "p", text: "The controller is Card Sports League GmbH, Kieler Straße 3, 15732 Schulzendorf, Germany. This website uses exclusively technically necessary storage technologies (local storage). No first-party HTTP cookies and no tracking, advertising or analytics technologies are used." },
            { type: "spacer" },
            { type: "h2", text: "Managing your settings" },
            { type: "p", text: "You can adjust or withdraw your cookie consent at any time. Use the “Change cookie settings” button at the bottom of this page to reopen the cookie banner." },
            { type: "p", text: "Because only technically necessary technologies are used, withdrawing consent has no effect on the functionality of the website. Should optional technologies (e.g. analytics) be added in the future, they will be listed in the overview below and loaded only after your explicit consent." },
            { type: "spacer" },
            { type: "h2", text: "What are cookies and comparable technologies?" },
            { type: "p", text: "Cookies are small text files that are stored in your browser or on your device. Local storage is a similar mechanism that stores data directly in the browser – unlike cookies, this data is not automatically sent to our server with every page request." },
            { type: "p", text: "We distinguish four categories:" },
            { type: "h3", text: "1. Necessary technologies" },
            { type: "p", text: "Required for the website and its core functions to work technically (e.g. storing your cookie consent). Without these technologies we cannot provide the requested services. Legal basis: Section 25 (2) no. 2 TDDDG, Art. 6 (1) lit. f GDPR." },
            { type: "h3", text: "2. Functional technologies" },
            { type: "p", text: "Store convenience settings (e.g. language, display preferences). Currently not used." },
            { type: "h3", text: "3. Analytics technologies" },
            { type: "p", text: "Collect anonymized usage statistics to improve the website. Currently not used." },
            { type: "h3", text: "4. Personalized technologies (targeting and advertising)" },
            { type: "p", text: "Used to display interest-based advertising. Currently not used." },
            { type: "spacer" },
            { type: "h2", text: "Overview of the technologies used" },
            { type: "p", text: "This website currently sets no first-party HTTP cookies. Only the following technically necessary entries are stored in your browser’s local storage." },
            { type: "h3", text: "Local storage entries" },
            { type: "p", text: "TCG_LS_COOKIE_PREFERENCE — Category: Necessary. Purpose: Stores your cookie consent choice so that the banner is not shown again. Storage period: until deleted by the user." },
            { type: "p", text: "tcg_admin_token — Category: Necessary (internal editorial area only). Purpose: Stores the login token for the internal administration interface; set only for logged-in administrators. Storage period: until logout." },
            { type: "h3", text: "Loaded third-party resources" },
            { type: "p", text: "Google Fonts (Figtree, Playfair Display, DM Sans) — Provider: Google Ireland Limited / Google LLC. Purpose: Loading the web fonts used. No cookies are set; your IP address is transmitted to Google." },
            { type: "spacer" },
            { type: "h2", text: "Your rights" },
            { type: "p", text: "Insofar as personal data is processed when these technologies are used, you have the rights described in our Privacy Policy (access, rectification, erasure, restriction, data portability, objection, and the right to lodge a complaint with a supervisory authority)." },
            { type: "p", text: "Because local storage entries are stored per device and per browser, your settings apply only to the browser in which you made your choice." },
            { type: "p", text: "If you have any questions about this Cookie Policy, you can contact us at norman@csl.tv." },
        ],
    },

    downloadsTos: {
        blocks: [
            { type: "h1", text: "Downloads Terms of use" },
        ],
    },

    header: {
        brand: "TCG AWARDS",
        routes: [
            { title: "First", path: "/" },
            { title: "Second", path: "/" },
            { title: "Third", path: "/" },
        ],
    },

    footer: {
        links: [
            { label: "Downloads", path: "/downloads" },
            { label: "Privacy", path: "/privacy" },
            { label: "Cookies", path: "/cookies" },
            { label: "Imprint", path: "/imprint" },
        ],
    },

    newsletter: {
        heading: "Newsletter",
        firstNameLabel: "First Name*",
        lastNameLabel: "Last Name*",
        mediaLabel: "Media / Corporate Name",
        linkLabel: "Link to Media / Channel / Website",
        countryLabel: "Country",
        emailLabel: "Email*",
        privacyNoticeHtml:
            'With this you agree to storage and usage of your personal data in accordance with our <a href="https://spiel-essen.de/en/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.',
        submitLabel: "Subscribe",
        formAction: "https://seu2.cleverreach.com/f/394092-424155/wcs/",
    },

    voting: {
        enabled: false,
        ctaLabel: "Vote now!",
        ctaDeadline: "Voting deadline: August 21, 2026",
        heading: "Final Voting",
        introText:
            "Take part in the final community voting for the 2026 TCG Awards. Until August 21, 2026, you can vote for your favorites in the following categories:",
        voteNote:
            "Select your personal winner from the top five in each category on the respective lists. Please note that you can only vote once. You cannot change your vote after submitting it. So if you want to vote in multiple categories, you must do so in a single voting session.",
        detailsNote: "In order for us to include your vote in the results, we need a few more details.",
        placeholderOption: "Select your vote!",
        firstNameLabel: "First name*",
        lastNameLabel: "Last name*",
        countryLabel: "Country",
        countryPlaceholder: "Select your country!",
        emailLabel: "Email*",
        submitLabel: "Vote now!",
        formAction: "https://seu2.cleverreach.com/f/394092-429427/wcs/",
        categories: [
            {
                label: "Game of the Year",
                fieldName: "1196083",
                options: [
                    "Disney Lorcana",
                    "Magic: The Gathering",
                    "One Piece TCG",
                    "Riftbound TCG",
                    "Star Wars: Unlimited",
                ],
            },
            {
                label: "Newcomer of the Year",
                fieldName: "1196084",
                options: [
                    "Bluthelden TTCG",
                    "Gundam TCG",
                    "Naruto Mythos TCG",
                    "Riftbound TCG",
                    "Star Wars: Unlimited",
                ],
            },
            {
                label: "Set of the Year",
                fieldName: "1196085",
                options: [
                    "A Lawless Time (Star Wars: Unlimited)",
                    "Lorwyn Eclipsed (Magic: The Gathering)",
                    "Origins (Riftbound TCG)",
                    "Secrets of Strixhaven (Magic: The Gathering)",
                    "Wilds Unknown (Disney Lorcana)",
                ],
            },
            {
                label: "Accessory of the Year",
                fieldName: "1196086",
                options: [
                    "Cards Almanac (Gamegenic)",
                    "Game Castle (Gamegenic)",
                    "Matte Sleeves (Dragen Shield)",
                    "Sidekick Pro XL (Gamegenic)",
                    "Squire XL+ (Gamegenic)",
                ],
            },
            {
                label: "Artwork of the Year",
                fieldName: "1196087",
                options: [
                    "Ahri-Inquisitive by Shawn Tan(SFD-227|Spiritforged|Riftbound)",
                    "Annihilation by Caio Cacau (AC7-035|Ancient Alphas|Alpha Clash TCG)",
                    "Armageddon by Dominik Mayer (M0003-SOA|Secrets of Strixhaven|Magic: The Gathering)",
                    "Baron Nashor by Zhang Yi (238|Unleashed|Riftbound)",
                    "Dawnhand Eulogist by Evyn Fong (0099|Lorwyn Eclipsed|Magic: The Gathering)",
                    "N's Zoroark ex by Raita Kazama (286/217|Ascended Heroes|Pokémon)",
                ],
            },
            {
                label: "Event of the Year",
                fieldName: "1196088",
                options: [
                    "4. Josephinen Pokecup for Pokémon, Lorcana and Star Wars: Unlimited (Dresden, Germany)",
                    "Galactic Championship for Star Wars: Unlimited (Las Vegas, USA)",
                    "Luminari Teamliga Deutschland for Disney Lorcana (Online)",
                    "Magic Con for Magic: The Gathering (Las Vegas, USA)",
                    "Tank, Heal, Slay! Magic the GAYthering for Magic: The Gathering (Berlin, Germany)",
                ],
            },
            {
                label: "Local Game Store of the Year",
                fieldName: "1196089",
                options: [
                    "42 Southside Fantasy (Berlin, Germany)",
                    "Battle Bear (Kaiserslautern, Germany)",
                    "LVL World of Gaming (Berlin, Germany)",
                    "Mulligan TCG Shop (Hamburg, Germany)",
                    "Trading Card Game Center (Kampen, Netherlands)",
                ],
            },
            {
                label: "Content Creator of the Year",
                fieldName: "1196090",
                options: [
                    "Denski (https://www.youtube.com/@DenskiTCG)",
                    "Holocron Card Hub (https://www.youtube.com/@HolocronCardHub)",
                    "Pleasant Kenobi (https://www.youtube.com/@PleasantKenobi)",
                    "Sol4ar1s (https://www.twitch.tv/sol4r1s)",
                    "TCG-Oli (https://youtube.com/@tcg-oli?si=kN4eG4oaV5XWYkdt)",
                ],
            },
            {
                label: "Equality Impact of the Year",
                fieldName: "1196091",
                options: [
                    "Magic Presents: Pride (Wizards of the Coast)",
                    "School Learn to Play (Battle Bear TCG Shop - Danny Scheubeck)",
                    "Spielend für Toleranz (Superelf-Cards + Palanca e.V.)",
                    "Tank, Heal, Slay - Magic: The GAYthering (LVL Berlin)",
                    "Tolarian Community College Trans Lifeline (Tolarian Community College)",
                    "Women in Magic (Women in Magic)",
                ],
            },
        ],
    },
};
