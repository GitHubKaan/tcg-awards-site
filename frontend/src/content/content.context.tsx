import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SiteContent } from "./content.types";
import { DEFAULT_CONTENT } from "./content.defaults";
import { API_BASE } from "./assets";

interface ContentState {
    content: SiteContent;
    loading: boolean;
}

const ContentContext = createContext<ContentState>({
    content: DEFAULT_CONTENT,
    loading: true,
});

/**
 * Fetches the full content document once on mount. Until it loads — or if the
 * backend is unreachable — the baked-in defaults are used so the site never
 * renders empty. Fetched keys are merged over the defaults, so a missing key
 * still falls back gracefully.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
    const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        fetch(`${API_BASE}/api/content`)
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((data: Partial<SiteContent>) => {
                if (active) setContent({ ...DEFAULT_CONTENT, ...data });
            })
            .catch(() => {
                /* keep defaults */
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);

    return (
        <ContentContext.Provider value={{ content, loading }}>
            {children}
        </ContentContext.Provider>
    );
}

/** Access the full site content (always defined; defaults until loaded). */
export function useContent(): SiteContent {
    return useContext(ContentContext).content;
}

export function useContentState(): ContentState {
    return useContext(ContentContext);
}
