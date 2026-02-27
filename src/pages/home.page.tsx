import "./home.page.css";
import Logo from "../assets/logo_text.png";
import Logo2 from "../assets/logo.png";
import InfoBoxComponent from "../components/infoBox.component";
import FrameComponent from "../components/frame.component";
import ImgInfoBoxComponent from "../components/imgInfoBox.component";
import BannerImage from "../assets/crads_banner.png";
import LineComponent from "../components/line.component";
import TrippleBoxComponent from "../components/trippleBox.component";
import IconElementComponent from "../components/iconElement.component";
import ContentBoxComponent from "../components/contentBox.component";
import { useRef } from "react";
import NewsletterComponent from "../components/newsletter.component";

function HomePage() {
    const section1 = useRef<HTMLDivElement | null>(null);
    const section2 = useRef<HTMLDivElement | null>(null);
    const section3 = useRef<HTMLDivElement | null>(null);
    const section4 = useRef<HTMLDivElement | null>(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return (
        <div id="home-page" className="default-page">
            <img className="top-logo mt-5 no-select" src={Logo} alt="logo" width={400} />

            <div className="flex gap-3 wrap center">
                <h4 className="header-nav no-select"
                    onClick={() => {
                        const el = section1.current;
                        if (el) {
                            const top = el.getBoundingClientRect().top + window.scrollY - 30;
                            window.scrollTo({ top, behavior: "smooth" });
                        }
                    }}>why</h4>
                <h4 className="header-nav no-select"
                    onClick={() => {
                        const el = section2.current;
                        if (el) {
                            const top = el.getBoundingClientRect().top + window.scrollY - 30;
                            window.scrollTo({ top, behavior: "smooth" });
                        }
                    }}>the awards</h4>
                <h4 className="header-nav no-select"
                    onClick={() => {
                        const el = section2.current;
                        if (el) {
                            const top = el.getBoundingClientRect().top + window.scrollY - 30;
                            window.scrollTo({ top, behavior: "smooth" });
                        }
                    }}>socials</h4>
                <h4 className="header-nav no-select"
                    onClick={() => {
                        const el = section4.current;
                        if (el) {
                            const top = el.getBoundingClientRect().top + window.scrollY - 30;
                            window.scrollTo({ top, behavior: "smooth" });
                        }
                    }}>newsletter</h4>
            </div>

            {/* TOP FIRST ELEMENT (INFO BOX AND TRIPPLE FRAME)
            
            <div>
                <InfoBoxComponent
                    ref={section1}
                    title={{
                        top: "WHY WE\nCREATED THE",
                        bottom: "TCG AWARDS"
                    }}
                    text={`Trading Card Games are more than products. They are culture, creativity, competition, community and craftsmanship.
                    
                    Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.

                    That changes now.`}
                    className="first-info-box"
                    style={{ paddingBottom: 130 }}
                />

                <div className="top-tripple-frames">
                    <div className="flex gap-3">
                        <FrameComponent
                            style={{ flex: 1 }}
                            title={{
                                top: "game of",
                                bottom: "the year"
                            }}
                            text="Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur? Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur?"
                        />
                        <FrameComponent
                            style={{ flex: 1 }}
                            title={{
                                top: "game of",
                                bottom: "the year"
                            }}
                            text="Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur? Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur?"
                        />
                        <FrameComponent
                            style={{ flex: 1 }}
                            title={{
                                top: "game of",
                                bottom: "the year"
                            }}
                            text="Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur? Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur?"
                        />
                    </div>
                </div>
            </div>
            
            */}
            <div>
                <InfoBoxComponent
                    ref={section1}
                    title={{
                        top: "WHY WE\nCREATED THE",
                        bottom: "TCG AWARDS"
                    }}
                    text={`Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retailers, elite players, artists, collectors, event organizers, and content creators. Yet despite its scale, innovation, and cultural impact, there has never been a dedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.
                    
                    That changes now.

                    The TCG Awards were created to recognize excellence across the entire Trading Card Game ecosystem — from groundbreaking games and sets to unforgettable events, outstanding local game stores, creators, players, artists, service providers, and industry partnerships.
                    
                    This is not about popularity alone.
                    This is about excellence, innovation, community impact, and meaningful contribution.
                    
                    The awards combine the voice of the global community with the expertise of an independent jury, ensuring that both passion and professional perspective shape the outcome.
                    
                    By setting a benchmark for quality, creativity, performance, and responsibility — from Game of the Year to Equality Impact of the Year — the TCG Awards celebrate those who elevate the industry and shape its future.`}
                    className="first-info-box"
                />
            </div>
            
            <div className="w-100 flex column gap-3">
                <div className="w-100 flex center">
                    <h1>TCG Awards</h1>
                </div>
                <div className="grid-icons">
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />

                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                </div>
                <div className="grid-icons tripple">
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        className="mobile-hide"
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                </div>
                <div className="grid-icons double">
                    <FrameComponent
                        className="mobile-show"
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                    <FrameComponent
                        image={Logo2}
                        title={{
                            top: "icon",
                            bottom: "element"
                        }}
                        notRevealed
                    />
                </div>
            </div>

            <InfoBoxComponent
                ref={section2}
                title={{
                    top: "Behind the",
                    bottom: "TCG Awards"
                }}
                text={`The TCG Awards are initiated by Card Sports League GmbH and Hana Sports & Entertainment GmbH in partnership with Merz Verlag, organizer of SPIEL Essen, the worlds largest and most important fair for all tabletop games including trading cards
                    
                    The awards combine the voice of the global community with the expertise of an independent jury, ensuring that both passion and professional perspective shape the outcome. Players, fans, and all who are passionate about TCGs can enter cases into the award, as well as industry professionals, such as publishers, agencies, creators and many more. Overall, there will be 13 different categories`}
            />

            <ImgInfoBoxComponent
                ref={section3}
                title={{
                    top: "socials"
                }}
                socials
                text={`Want to stay in the loop? Follow our social media channels and be the first to hear about TCG Awards updates, exclusive insights, and exciting announcements. Join the community!`}
                image={BannerImage}
            />
            

            <NewsletterComponent ref={section4} />

            {/**
             
            <ImgInfoBoxComponent
                ref={section3}
                title={{
                    top: "das sit ein",
                    bottom: "bild element"
                }}
                text={`Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retailers, elite players, artists, collectors, event organizers, and content creators. Yet despite its scale, innovation, and cultural impact, there has never been a dedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.
                    
                Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.

                Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.`}
                image={BannerImage}
            />
             */}
            
            

            {/**
             

            <img className="top-logo mt-5 no-select" src={Logo2} alt="logo" width={250} />

            <div className="flex column items-center gap-3">
                <h1 className="text-center">why we created the tcg awards</h1>

                <LineComponent />

                <div className="double-block-text">
                    <p>Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.</p>
                    <p>Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape. Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.</p>
                </div>
            </div>

            <TrippleBoxComponent
                firstBox={{
                    title: `game of\nthe year`,
                    text: `Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.`,
                }}
                secondBox={{
                    title: `event of\nthe year`,
                    text: `Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.`,
                }}
                thirdBox={{
                    title: `set of\nthe year`,
                    text: `Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.`,
                }}
            />

            <div className="flex column items-center gap-3">
                <h1 className="text-center">headline headline</h1>

                <LineComponent />

                <div className="double-block-text">
                    <p>Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.</p>
                    <p>Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.</p>
                </div>
            </div>

            <div className="awards-tripple-container">
                <IconElementComponent
                    image={Logo2}
                    title="icon element"
                    className="flex-1 w-100"
                />
                <IconElementComponent
                    image={Logo2}
                    title="icon element"
                    className="flex-1 w-100"
                />
                <IconElementComponent
                    image={Logo2}
                    title="icon element"
                    className="flex-1 w-100"
                />
                <IconElementComponent
                    image={Logo2}
                    title="icon element"
                    className="flex-1 w-100"
                />
                <IconElementComponent
                    image={Logo2}
                    title="icon element"
                    className="flex-1 w-100"
                />
                <IconElementComponent
                    image={Logo2}
                    title="icon element"
                    className="flex-1 w-100"
                />
            </div>

            <ContentBoxComponent
                image={BannerImage}
                title={`das ist ein\nbild element`}
                text={`Trading Card Games are more than products. They are culture, creativity, competition, community and craftsmanship.
                    
                Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.

                Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.`}
            />
             */}
        </div>
    );
}

export default HomePage;