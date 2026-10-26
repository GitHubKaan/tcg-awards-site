import "./winners.page.css";
import { useEffect } from "react";
import { useContentState } from "../content/content.context";
import { cdnUrl } from "../content/assets";
import { redirectToErrorPage } from "../utils/error.util";

function WinnersPage() {
    const { content, loading } = useContentState();
    const { winners } = content;

    // The winners page only exists once the gala is over (admin flips the
    // "show is over" switch). Wait for content to load before deciding, like
    // the /finalists and /vote pages do.
    useEffect(() => {
        if (!loading && !winners.showEnded) {
            redirectToErrorPage({ title: "Page not found" });
        }
    }, [loading, winners.showEnded]);

    if (loading || !winners.showEnded) {
        return <div id="winners-page" className="default-page" />;
    }

    return (
        <div id="winners-page" className="default-page">
            <header className="winners-hero">
                <div className="winners-hero-rays" aria-hidden="true" />
                <div className="winners-hero-glow" aria-hidden="true" />

                <div className="winners-hero-trophy no-select" aria-hidden="true">
                    <svg viewBox="0 0 48 48" width="52" height="52" fill="none">
                        <path
                            d="M12 6h24v6a12 12 0 0 1-24 0V6Z"
                            fill="url(#wp-cup)"
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
                            <linearGradient id="wp-cup" x1="24" y1="6" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                <stop stopColor="var(--c-washed-gold)" />
                                <stop offset="1" stopColor="var(--c-dark-gold)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {winners.eyebrow && <span className="winners-eyebrow no-select">{winners.eyebrow}</span>}
                <h1>{winners.heading}</h1>
                {winners.subheading && <p className="winners-subheading">{winners.subheading}</p>}
            </header>

            <div className="winners-grid">
                {winners.winners.map((w, i) => (
                    <article className="winners-card" key={i}>
                        <img
                            className="winners-card-image no-select"
                            src={cdnUrl(w.image)}
                            alt={w.category}
                            loading="lazy"
                        />
                    </article>
                ))}
            </div>
        </div>
    );
}

export default WinnersPage;
