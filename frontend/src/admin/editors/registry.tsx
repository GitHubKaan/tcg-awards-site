import { ComponentType } from "react";
import { ContentKey } from "../../content/content.types";
import HomeEditor from "./HomeEditor";
import BrandCasesEditor from "./BrandCasesEditor";
import BlocksEditor from "./BlocksEditor";
import VotingEditor from "./VotingEditor";
import FinalistsEditor from "./FinalistsEditor";
import {
    CommonEditor,
    DownloadsEditor,
    FooterEditor,
    HeaderEditor,
    JuryEditor,
    NewsletterEditor,
    SponsorsEditor,
} from "./SimpleEditors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EditorComponent = ComponentType<{ value: any; onChange: (v: any) => void }>;

/** Sidebar groups, rendered top-to-bottom in this order. */
export type EditorGroup = "Pages" | "Sections" | "Layout" | "Legal";

export const EDITOR_GROUP_ORDER: EditorGroup[] = ["Pages", "Sections", "Layout", "Legal"];

export interface EditorEntry {
    key: ContentKey;
    label: string;
    group: EditorGroup;
    Editor: EditorComponent;
}

export const EDITORS: EditorEntry[] = [
    // Pages — full pages a visitor navigates to.
    { key: "home", label: "Home", group: "Pages", Editor: HomeEditor },
    { key: "brandCasesInfo", label: "Brand Cases Info", group: "Pages", Editor: BrandCasesEditor },
    { key: "downloads", label: "Downloads", group: "Pages", Editor: DownloadsEditor },
    { key: "voting", label: "Final Voting", group: "Pages", Editor: VotingEditor },
    { key: "finalists", label: "Top 3 Finalists", group: "Pages", Editor: FinalistsEditor },
    // Sections — blocks embedded within the home page.
    { key: "jury", label: "Jury", group: "Sections", Editor: JuryEditor },
    { key: "sponsors", label: "Sponsors", group: "Sections", Editor: SponsorsEditor },
    { key: "newsletter", label: "Newsletter", group: "Sections", Editor: NewsletterEditor },
    // Layout — site-wide chrome and shared values.
    { key: "header", label: "Header", group: "Layout", Editor: HeaderEditor },
    { key: "footer", label: "Footer", group: "Layout", Editor: FooterEditor },
    { key: "common", label: "Common / Shared", group: "Layout", Editor: CommonEditor },
    // Legal — long-form legal documents.
    { key: "imprint", label: "Imprint", group: "Legal", Editor: BlocksEditor },
    { key: "privacy", label: "Privacy", group: "Legal", Editor: BlocksEditor },
    { key: "cookies", label: "Cookies", group: "Legal", Editor: BlocksEditor },
    { key: "downloadsTos", label: "Downloads Terms", group: "Legal", Editor: BlocksEditor },
];
