import { z } from "zod";
import { ContentKey } from "../../shared/content.types";

const ctaButton = z.object({
    label: z.string(),
    href: z.string().optional(),
    route: z.string().optional(),
});

const infoBox = z.object({
    titleTop: z.string(),
    titleBottom: z.string(),
    text: z.string(),
});

const common = z.object({
    logo: z.string(),
    logoText: z.string(),
    nominateUrl: z.string(),
    brandRegisterUrl: z.string(),
    defaultDeadline: z.string(),
});

const awardCategory = z.object({
    top: z.string(),
    bottom: z.string(),
    image: z.string(),
    mobileHidden: z.boolean().optional(),
});

const awardSection = z.object({
    title: z.string(),
    subtitle: z.string(),
    cta: ctaButton.optional(),
    deadline: z.string().optional(),
    gridVariant: z.enum(["", "quad", "tripple", "single"]),
    mobileLastSeparate: z.boolean().optional(),
    categories: z.array(awardCategory),
});

const home = z.object({
    topLogo: z.string(),
    nav: z.array(
        z.object({
            label: z.string(),
            section: z.number().optional(),
            route: z.string().optional(),
        })
    ),
    whyInfoBox: infoBox,
    awardsHeading: z.string(),
    awardSections: z.array(awardSection),
    behindInfoBox: infoBox,
    socials: z.object({
        title: z.string(),
        text: z.string(),
        image: z.string(),
    }),
});

const sponsors = z.object({
    heading: z.string(),
    logos: z.array(
        z.object({
            image: z.string(),
            alt: z.string(),
            width: z.number(),
        })
    ),
});

const jury = z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    members: z.array(
        z.object({
            name: z.string(),
            role: z.string(),
            image: z.string(),
        })
    ),
});

const downloads = z.object({
    title: z.string(),
    mediaCategoryTitle: z.string(),
    previews: z.array(z.string()),
    downloadButtonLabel: z.string(),
    zipUrl: z.string(),
    note: z.string(),
});

const brandCasesInfo = z.object({
    heroTitle: z.string(),
    heroSpan: z.string(),
    heroText: z.string(),
    ctaText: z.string(),
    ctaButton,
    categories: z.array(
        z.object({
            badge: z.string(),
            description: z.string(),
            steps: z.array(
                z.object({
                    label: z.string(),
                    text: z.string(),
                })
            ),
        })
    ),
    evaluationTitle: z.string(),
    evaluationText: z.string(),
    contactLabel: z.string(),
    contactEmail: z.string(),
});

const blocks = z.object({
    blocks: z.array(
        z.object({
            type: z.enum(["h1", "h2", "h3", "p", "spacer"]),
            text: z.string().optional(),
        })
    ),
});

const header = z.object({
    brand: z.string(),
    routes: z.array(z.object({ title: z.string(), path: z.string() })),
});

const footer = z.object({
    links: z.array(z.object({ label: z.string(), path: z.string() })),
});

const newsletter = z.object({
    heading: z.string(),
    firstNameLabel: z.string(),
    lastNameLabel: z.string(),
    mediaLabel: z.string(),
    linkLabel: z.string(),
    countryLabel: z.string(),
    emailLabel: z.string(),
    privacyNoticeHtml: z.string(),
    submitLabel: z.string(),
    formAction: z.string(),
});

const voting = z.object({
    enabled: z.boolean(),
    ctaLabel: z.string(),
    ctaDeadline: z.string(),
    heading: z.string(),
    introText: z.string(),
    voteNote: z.string(),
    detailsNote: z.string(),
    placeholderOption: z.string(),
    firstNameLabel: z.string(),
    lastNameLabel: z.string(),
    countryLabel: z.string(),
    countryPlaceholder: z.string(),
    emailLabel: z.string(),
    submitLabel: z.string(),
    formAction: z.string(),
    categories: z.array(
        z.object({
            label: z.string(),
            fieldName: z.string(),
            options: z.array(z.string()),
        })
    ),
});

export const CONTENT_SCHEMAS: Record<ContentKey, z.ZodTypeAny> = {
    common,
    home,
    sponsors,
    jury,
    downloads,
    brandCasesInfo,
    imprint: blocks,
    privacy: blocks,
    cookies: blocks,
    downloadsTos: blocks,
    header,
    footer,
    newsletter,
    voting,
};
