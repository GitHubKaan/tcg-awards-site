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

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Recursively merges fetched content over the baked-in defaults. Unlike a
 * shallow spread, this fills in keys the backend omits at every level — so a
 * default field added after the stored content was saved (e.g. a new
 * `sponsoredBy` on an award section) still shows up. Arrays are merged by
 * index, using the default element as a template for missing keys; the
 * backend's length wins, so removed/added items are respected.
 */
function deepMerge<T>(base: T, override: unknown): T {
    if (override === undefined) return base;
    if (Array.isArray(base) && Array.isArray(override)) {
        return override.map((item, i) =>
            i < base.length ? deepMerge(base[i], item) : item
        ) as unknown as T;
    }
    if (isPlainObject(base) && isPlainObject(override)) {
        const result: Record<string, unknown> = { ...base };
        for (const key of Object.keys(override)) {
            if (override[key] === undefined) continue;
            result[key] =
                key in base ? deepMerge(base[key], override[key]) : override[key];
        }
        return result as T;
    }
    return override as T;
}

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
                if (active) setContent(deepMerge(DEFAULT_CONTENT, data));
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
