import "./home.page.css";
import Logo from "../assets/logo_text.png";
import Logo2 from "../assets/logo.png";
import InfoBoxComponent from "../components/infoBox.component";
import FrameComponent from "../components/frame.component";
import ImgInfoBoxComponent from "../components/imgInfoBox.component";
import BannerImage from "../assets/crads_banner.png";

function HomePage() {
    return (
        <div id="home-page" className="default-page">
            <img className="top-logo mt-5 no-select" src={Logo} alt="logo" width={400} />

            {/* TOP FIRST ELEMENT (INFO BOX AND TRIPPLE FRAME) */}
            <div>
                <InfoBoxComponent
                    title={{
                        top: "WHY WE\nCREATED THE",
                        bottom: "TCG AWARDS"
                    }}
                    text={`Trading Card Games are more than products. They are culture, creativity, competition, community and craftsmanship.
                    
                    Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.

                    That changes now.`}
                    className="first-info-box"
                    style={{
                        paddingBottom: 130
                    }}
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

            <InfoBoxComponent
                title={{
                    top: "HEADLINE",
                    bottom: "ZWEIZEILIG"
                }}
                text={`Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu`}
            />

            <div className="tripple-icon">
                <FrameComponent
                    style={{ flex: 1 }}
                    image={Logo2}
                    title={{
                        top: "icon",
                        bottom: "element"
                    }}
                />
                <FrameComponent
                    style={{ flex: 1 }}
                    image={Logo2}
                    title={{
                        top: "icon",
                        bottom: "element"
                    }}
                />
                <FrameComponent
                    style={{ flex: 1 }}
                    image={Logo2}
                    title={{
                        top: "icon",
                        bottom: "element"
                    }}
                />
            </div>

            <ImgInfoBoxComponent
                title={{
                    top: "das sit ein",
                    bottom: "bild element"
                }}
                text={`Trading Card Games are more than products. They are culture, creativity, competition, community and craftsmanship.
                    
                Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.

                Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.`}
                image={BannerImage}
            />
        </div>
    );
}

export default HomePage;