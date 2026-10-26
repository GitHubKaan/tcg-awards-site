import "./home.page.css";
import InfoBoxComponent from "../components/infoBox.component";
import FrameComponent from "../components/frame.component";
import ImgInfoBoxComponent from "../components/imgInfoBox.component";
import { useEffect, useRef, useState } from "react";
import NewsletterComponent from "../components/newsletter.component";
import SponsorsComponent from "../components/sponsors.component";
import AwardsLineComponent from "../components/awardsLine.component";
import { useNavigate } from "react-router-dom";
import VoteButtonComponent from "../components/voteButton.component";
import JurySectionComponent from "../components/jurySection.component";
import CountdownComponent from "../components/countdown.component";
import FinalistsBannerComponent from "../components/finalistsBanner.component";
import { useContent } from "../content/content.context";
import { cdnUrl } from "../content/assets";
import { AwardSection, CtaButton, HomeNavItem } from "../content/content.types";
import { Portal } from "../utils/portal.util";
import { preventScroll } from "../utils/scroll.util";

function HomePage() {
    const navigate = useNavigate();
    const { home, voting, finalists, winners } = useContent();

    const [menuOpen, setMenuOpen] = useState(false);

    const section1 = useRef<HTMLDivElement | null>(null);
    const section2 = useRef<HTMLDivElement | null>(null);
    const section3 = useRef<HTMLDivElement | null>(null);
    const section4 = useRef<HTMLDivElement | null>(null);
    const section5 = useRef<HTMLDivElement | null>(null);
    const sections = [section1, section2, section3, section4, section5];

    const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
        const el = ref.current;
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 30;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const onCta = (cta: CtaButton) => {
        if (cta.route) navigate(cta.route);
        else if (cta.href) window.open(cta.href, "_blank");
    };

    // "socials" is intentionally dropped from the nav; `the event`/`faq` are ensured
    // even when older stored content doesn't include them.
    const navItems: HomeNavItem[] = [
        ...home.nav.filter((n) => n.label.trim().toLowerCase() !== "socials"),
        ...(home.nav.some((n) => n.route === "/the-event") ? [] : [{ label: "the event", route: "/the-event" }]),
        ...(home.nav.some((n) => n.route === "/faq") ? [] : [{ label: "faq", route: "/faq" }]),
    ];

    const onNav = (item: HomeNavItem) => {
        if (item.route) navigate(item.route);
        else if (item.section) scrollToRef(sections[item.section - 1]);
    };

    // From the mobile drawer: close first (releases the scroll lock) then act.
    const onMobileNav = (item: HomeNavItem) => {
        setMenuOpen(false);
        if (item.route) navigate(item.route);
        else if (item.section) {
            const section = item.section;
            setTimeout(() => scrollToRef(sections[section - 1]), 60);
        }
    };

    // Lock background scroll while the mobile drawer is open; Escape closes it.
    useEffect(() => {
        if (!menuOpen) return;
        preventScroll(true);
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            preventScroll(false);
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    const renderSection = (s: AwardSection, idx: number) => (
        <div key={idx} className="w-100 flex column gap-3">
            <AwardsLineComponent title={s.title} subtitle={s.subtitle} />

            {s.sponsoredBy && (
                <div className="w-100 flex center no-select">
                    <div className="sponsored-badge">
                        <span className="sponsored-badge-label">Sponsored by</span>
                        <span className="sponsored-badge-divider" />
                        <span className="sponsored-badge-name">{s.sponsoredBy}</span>
                    </div>
                </div>
            )}

            {s.cta && (
                <div className="flex gap column center items-center">
                    <div className="flex column gap-1 center items-center">
                        <VoteButtonComponent title={s.cta.label} onClick={() => onCta(s.cta!)} />
                        {s.deadline && (
                            <div className="w-100 flex center items-center">
                                <p>{s.deadline}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className={`grid-icons ${s.gridVariant}`.trim()}>
                {s.categories.map((cat, i) => {
                    const isLast = i === s.categories.length - 1;
                    const hide = cat.mobileHidden || (s.mobileLastSeparate && isLast);
                    return (
                        <FrameComponent
                            key={i}
                            className={hide ? "mobile-hide" : ""}
                            image={cdnUrl(cat.image)}
                            title={{ top: cat.top, bottom: cat.bottom }}
                        />
                    );
                })}
            </div>

            {s.mobileLastSeparate && s.categories.length > 0 && (
                <div className="w-100 flex center items-center mobile-show">
                    <FrameComponent
                        className="last-frame-element-mobile"
                        image={cdnUrl(s.categories[s.categories.length - 1].image)}
                        title={{
                            top: s.categories[s.categories.length - 1].top,
                            bottom: s.categories[s.categories.length - 1].bottom,
                        }}
                    />
                </div>
            )}
        </div>
    );

    return (
        <div id="home-page" className="default-page">
            <img className="top-logo mt-5 no-select" src={cdnUrl(home.topLogo)} alt="logo" width={400} />

            {/* Desktop: inline nav row. Hidden on mobile in favour of the burger. */}
            <div className="home-nav mobile-hide flex gap-3 wrap center">
                {navItems.map((item, i) => (
                    <h4 key={i} className="header-nav no-select" onClick={() => onNav(item)}>
                        {item.label}
                    </h4>
                ))}
            </div>

            {/* Mobile: burger button (shown only on mobile). Portaled to <body> so
                it stacks above the sticky ticket banner instead of being trapped
                below it inside the page's stacking context. */}
            {!menuOpen && (
                <Portal>
                    <button
                        type="button"
                        className="home-burger mobile-show clickable no-select"
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(true)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </Portal>
            )}

            {menuOpen && (
                <Portal>
                    <div className="home-menu-overlay" onClick={() => setMenuOpen(false)}>
                        <div
                            className="home-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="home-menu-close no-select"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                            <nav className="home-menu-links">
                                {navItems.map((item, i) => (
                                    <h4
                                        key={i}
                                        className="header-nav no-select"
                                        onClick={() => onMobileNav(item)}
                                    >
                                        {item.label}
                                    </h4>
                                ))}
                            </nav>
                        </div>
                    </div>
                </Portal>
            )}

            {/* Once the gala is over the countdown/Twitch stream is replaced by a
                thank-you card that links to the winners page. */}
            {winners.showEnded ? (
                <section className="show-ended no-select">
                    <div className="show-ended-glow" aria-hidden="true" />

                    <span className="show-ended-kicker">Thank you for watching</span>
                    <h1 className="show-ended-title">{winners.endedTitle}</h1>
                    <span className="show-ended-rule" aria-hidden="true" />
                    <p className="show-ended-text">{winners.endedText}</p>
                    <button
                        type="button"
                        className="show-ended-cta clickable"
                        onClick={() => navigate("/winners")}
                    >
                        <span className="show-ended-cta-shine" aria-hidden="true" />
                        <span className="show-ended-cta-label">{winners.bannerCta}</span>
                        <svg className="show-ended-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </section>
            ) : (
                home.countdown.enabled && (
                    <CountdownComponent
                        target={home.countdown.target}
                        title={home.countdown.title}
                        subtitle={home.countdown.subtitle}
                        twitchChannel={home.countdown.twitchChannel}
                        image={home.countdown.image ? cdnUrl(home.countdown.image) : ""}
                        fallbackText={home.countdown.fallbackText}
                    />
                )
            )}

            {/* Directions to the venue are irrelevant once the gala is over. */}
            {!winners.showEnded && (
                <div className="event-link-row w-100 flex center no-select">
                    <button type="button" className="event-link clickable" onClick={() => navigate("/the-event")}>
                        <svg
                            className="event-link-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.6}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
                            <circle cx="12" cy="10" r="2.5" />
                        </svg>
                        <span className="event-link-text">Event info &amp; how to get there</span>
                        <svg
                            className="event-link-arrow"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </button>
                </div>
            )}

            {finalists.enabled && (
                <FinalistsBannerComponent
                    badge={finalists.bannerBadge}
                    title={finalists.bannerTitle}
                    cta={finalists.bannerCta}
                />
            )}

            {voting.enabled && (
                <div className="vote-hero no-select">
                    <VoteButtonComponent
                        className="vote-hero-button"
                        title={voting.ctaLabel}
                        onClick={() => navigate("/vote")}
                    />
                    {voting.ctaDeadline && <p className="vote-hero-deadline">{voting.ctaDeadline}</p>}
                </div>
            )}

            <div>
                <InfoBoxComponent
                    ref={section1}
                    title={{ top: home.whyInfoBox.titleTop, bottom: home.whyInfoBox.titleBottom }}
                    text={home.whyInfoBox.text}
                    className="first-info-box"
                />
            </div>

            <div className="w-100 flex column gap-3">
                <div className="w-100 flex center">
                    <h1>{home.awardsHeading}</h1>
                </div>

                {home.awardSections.map(renderSection)}
            </div>

            <JurySectionComponent ref={section5} />

            <InfoBoxComponent
                ref={section2}
                title={{ top: home.behindInfoBox.titleTop, bottom: home.behindInfoBox.titleBottom }}
                text={home.behindInfoBox.text}
            />

            <SponsorsComponent />

            <ImgInfoBoxComponent
                ref={section3}
                title={{ top: home.socials.title }}
                socials
                text={home.socials.text}
                image={cdnUrl(home.socials.image)}
                imageInsideBox
            />

            <NewsletterComponent ref={section4} />
        </div>
    );
}

export default HomePage;
