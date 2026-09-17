import "./finalists.page.css";
import { useEffect } from "react";
import { useContentState } from "../content/content.context";
import { redirectToErrorPage } from "../utils/error.util";

function FinalistsPage() {
    const { content, loading } = useContentState();
    const { finalists } = content;

    // Defaults may ship enabled, but a saved backend document can disable it —
    // wait for content to load before deciding, like the /vote page does.
    useEffect(() => {
        if (!loading && !finalists.enabled) {
            redirectToErrorPage({ title: "Page not found" });
        }
    }, [loading, finalists.enabled]);

    if (loading || !finalists.enabled) {
        return <div id="finalists-page" className="default-page" />;
    }

    // Meta strip counts, derived from the content so they never drift.
    const groupCount = finalists.groups.length;
    const categoryCount = finalists.groups.reduce((sum, g) => sum + g.categories.length, 0);

    // Running ordinal used as a faded editorial numeral on each category card.
    // It is a page index (order of appearance), not a ranking — the finalists
    // themselves stay unranked (alphabetical).
    let categoryIndex = 0;

    return (
        <div id="finalists-page" className="default-page">
            <header className="finalists-hero">
                <div className="finalists-hero-rays" aria-hidden="true" />
                <div className="finalists-hero-glow" aria-hidden="true" />

                <div className="finalists-hero-trophy no-select" aria-hidden="true">
                    <svg viewBox="0 0 48 48" width="52" height="52" fill="none">
                        <path
                            d="M12 6h24v6a12 12 0 0 1-24 0V6Z"
                            fill="url(#fp-cup)"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 9H7a4 4 0 0 0 0 8h6M36 9h5a4 4 0 0 1 0 8h-6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M24 24v7M18 39h12M20 39c0-3 1-5 4-5s4 2 4 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M24 10.5l1.4 2.8 3.1.5-2.2 2.2.5 3.1-2.8-1.5-2.8 1.5.5-3.1-2.2-2.2 3.1-.5 1.4-2.8Z"
                            fill="currentColor"
                        />
                        <defs>
                            <linearGradient id="fp-cup" x1="24" y1="6" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                <stop stopColor="var(--c-washed-gold)" />
                                <stop offset="1" stopColor="var(--c-dark-gold)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {finalists.eyebrow && (
                    <span className="finalists-eyebrow no-select">{finalists.eyebrow}</span>
                )}
                <h1>{finalists.heading}</h1>
                {finalists.subheading && <p className="finalists-subheading">{finalists.subheading}</p>}

                <div className="finalists-meta no-select">
                    <div className="finalists-meta-item">
                        <span className="finalists-meta-num">{categoryCount}</span>
                        <span className="finalists-meta-label">Categories</span>
                    </div>
                    <span className="finalists-meta-sep" aria-hidden="true" />
                    <div className="finalists-meta-item">
                        <span className="finalists-meta-num">{groupCount}</span>
                        <span className="finalists-meta-label">Award Groups</span>
                    </div>
                    <span className="finalists-meta-sep" aria-hidden="true" />
                    <div className="finalists-meta-item">
                        <span className="finalists-meta-num">1</span>
                        <span className="finalists-meta-label">Gala Night</span>
                    </div>
                </div>
            </header>

            {finalists.intro.length > 0 && (
                <section className="finalists-intro">
                    {finalists.intro.map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </section>
            )}

            {finalists.galaNote && (
                <div className="finalists-gala-note">
                    <span className="finalists-gala-note-badge no-select" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                            <path
                                d="M12 3l2.5 5.2 5.7.8-4.1 4 1 5.6L12 21l-5.1 2.6 1-5.6-4.1-4 5.7-.8L12 3Z"
                                fill="currentColor"
                            />
                        </svg>
                    </span>
                    <p>{finalists.galaNote}</p>
                </div>
            )}

            <div className="finalists-groups">
                {finalists.groups.map((group, gi) => (
                    <section className="finalists-group" key={gi}>
                        <div className="finalists-group-head">
                            <span className="finalists-group-index no-select" aria-hidden="true">
                                {String(gi + 1).padStart(2, "0")}
                            </span>
                            {group.kicker && <span className="finalists-group-kicker no-select">{group.kicker}</span>}
                            <h2>{group.heading}</h2>
                            {group.note && <span className="finalists-group-note no-select">{group.note}</span>}
                            <span className="finalists-group-rule no-select" aria-hidden="true" />
                        </div>

                        <div className="finalists-category-grid">
                            {group.categories.map((cat, ci) => {
                                categoryIndex += 1;
                                const hasFinalists = cat.finalists.length > 0;
                                return (
                                    <article
                                        className={`finalists-category ${hasFinalists ? "" : "is-tba"}`}
                                        key={ci}
                                    >
                                        <span className="finalists-category-ordinal no-select" aria-hidden="true">
                                            {String(categoryIndex).padStart(2, "0")}
                                        </span>
                                        <div className="finalists-category-head">
                                            <h3>{cat.title}</h3>
                                            {cat.note && <p className="finalists-category-note">{cat.note}</p>}
                                        </div>

                                        {hasFinalists ? (
                                            <ol className="finalists-list">
                                                {cat.finalists.map((f, fi) => (
                                                    <li className="finalists-item" key={fi}>
                                                        <span className="finalists-item-mark no-select" aria-hidden="true">
                                                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
                                                                <path
                                                                    d="M12 3l2.5 5.2 5.7.8-4.1 4 1 5.6L12 21l-5.1 2.6 1-5.6-4.1-4 5.7-.8L12 3Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span className="finalists-item-body">
                                                            <span className="finalists-item-name">{f.name}</span>
                                                            {f.detail && (
                                                                <span className="finalists-item-detail">{f.detail}</span>
                                                            )}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ol>
                                        ) : (
                                            <p className="finalists-tba no-select">To be announced</p>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default FinalistsPage;
