import "./finalistsBanner.component.css";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Animated "Top 3 Finalists Announced" banner for the home page: a centred
 * trophy spotlight with rotating rays, a pulsing glow and a shimmering CTA.
 * Clicking anywhere navigates to the /finalists page.
 *
 * @param badge Small eyebrow above the title, e.g. "Top 3 Finalists Announced".
 * @param title Main line, e.g. "The Top 3 across all 13 categories are set".
 * @param cta   Call-to-action label, e.g. "Reveal the Top 3".
 */
function FinalistsBannerComponent(
    props: Readonly<{
        badge: string;
        title: string;
        cta: string;

        className?: string;
        children?: ReactNode;
        [key: string]: any;
    }>
) {
    const { badge, title, cta, className, children, ...overflowProps } = props;
    const navigate = useNavigate();

    return (
        <div
            className={`finalists-banner-component no-select ${className ?? ""}`}
            onClick={() => navigate("/finalists")}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/finalists");
            }}
            {...overflowProps}
        >
            <div className="finalists-banner-rays" aria-hidden="true" />
            <div className="finalists-banner-glow" aria-hidden="true" />

            <div className="finalists-banner-trophy" aria-hidden="true">
                <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                    <path
                        d="M12 6h24v6a12 12 0 0 1-24 0V6Z"
                        fill="url(#fb-cup)"
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
                    <path d="M24 24v7M18 39h12M20 39c0-3 1-5 4-5s4 2 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 10.5l1.4 2.8 3.1.5-2.2 2.2.5 3.1-2.8-1.5-2.8 1.5.5-3.1-2.2-2.2 3.1-.5 1.4-2.8Z" fill="currentColor" />
                    <defs>
                        <linearGradient id="fb-cup" x1="24" y1="6" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--c-washed-gold)" />
                            <stop offset="1" stopColor="var(--c-dark-gold)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <span className="finalists-banner-badge">{badge}</span>
            <h2 className="finalists-banner-title">{title}</h2>

            <span className="finalists-banner-cta">
                <span className="finalists-banner-cta-shine" />
                <span className="finalists-banner-cta-label">{cta}</span>
                <svg className="finalists-banner-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </div>
    );
}

export default FinalistsBannerComponent;
