import "./home.page.css";
import InfoBoxComponent from "../components/infoBox.component";
import FrameComponent from "../components/frame.component";
import ImgInfoBoxComponent from "../components/imgInfoBox.component";
import { useRef } from "react";
import NewsletterComponent from "../components/newsletter.component";
import SponsorsComponent from "../components/sponsors.component";
import AwardsLineComponent from "../components/awardsLine.component";
import { useNavigate } from "react-router-dom";
import VoteButtonComponent from "../components/voteButton.component";
import { useContent } from "../content/content.context";
import { cdnUrl } from "../content/assets";
import { AwardSection, CtaButton } from "../content/content.types";

function HomePage() {
    const navigate = useNavigate();
    const { home } = useContent();

    const section1 = useRef<HTMLDivElement | null>(null);
    const section2 = useRef<HTMLDivElement | null>(null);
    const section3 = useRef<HTMLDivElement | null>(null);
    const section4 = useRef<HTMLDivElement | null>(null);
    const sections = [section1, section2, section3, section4];

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

    const renderSection = (s: AwardSection, idx: number) => (
        <div key={idx} className="w-100 flex column gap-3">
            <AwardsLineComponent title={s.title} subtitle={s.subtitle} />

            {s.cta && (
                <div className="flex gap column center items-center">
                    <div className="flex column gap-1">
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

            <div className="flex gap-3 wrap center">
                {home.nav.map((item, i) => (
                    <h4
                        key={i}
                        className="header-nav no-select"
                        onClick={() => {
                            if (item.route) navigate(item.route);
                            else if (item.section) scrollToRef(sections[item.section - 1]);
                        }}
                    >
                        {item.label}
                    </h4>
                ))}
            </div>

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
