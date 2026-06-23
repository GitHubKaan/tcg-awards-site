import { ComponentType } from "react";
import { ContentKey } from "../../content/content.types";
import HomeEditor from "./HomeEditor";
import BrandCasesEditor from "./BrandCasesEditor";
import BlocksEditor from "./BlocksEditor";
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

export interface EditorEntry {
    key: ContentKey;
    label: string;
    Editor: EditorComponent;
}

export const EDITORS: EditorEntry[] = [
    { key: "home", label: "Home", Editor: HomeEditor },
    { key: "brandCasesInfo", label: "Brand Cases Info", Editor: BrandCasesEditor },
    { key: "jury", label: "Jury", Editor: JuryEditor },
    { key: "downloads", label: "Downloads", Editor: DownloadsEditor },
    { key: "sponsors", label: "Sponsors", Editor: SponsorsEditor },
    { key: "imprint", label: "Imprint", Editor: BlocksEditor },
    { key: "privacy", label: "Privacy", Editor: BlocksEditor },
    { key: "downloadsTos", label: "Downloads Terms", Editor: BlocksEditor },
    { key: "newsletter", label: "Newsletter", Editor: NewsletterEditor },
    { key: "header", label: "Header", Editor: HeaderEditor },
    { key: "footer", label: "Footer", Editor: FooterEditor },
    { key: "common", label: "Common / Shared", Editor: CommonEditor },
];
