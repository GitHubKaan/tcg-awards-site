import "./home.page.css";
import Logo from "../assets/logo_text.png";
import InfoBoxComponent from "../components/infoBox.component";
import FrameComponent from "../components/frame.component";

function HomePage() {
    return (
        <div id="home-page" className="default-page">
            <img className="mt-5 no-select" src={Logo} alt="logo" width={400} />

            <InfoBoxComponent
                title={{
                    top: "WHY WE\nCREATED THE",
                    bottom: "TCG AWARDS"
                }}
                text={`Trading Card Games are more than products. They are culture, creativity, competition, community and craftsmanship.
                
                Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.

                That changes now.`}
            />

            <FrameComponent
                width="300px"
                image={Logo}
                title={{
                    top: "game of",
                    bottom: "the year"
                }}
                text="Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur?"
            />

            <InfoBoxComponent
                title={{
                    top: "HEADLINE",
                    bottom: "ZWEIZEILIG"
                }}
                text={`Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu Fugiat que pro iur? Pienis volo et quoSitatuscipsum hil iuntio. Nam reprae inistib eatatectur si aut aut et maxim reri nimperes consend ionsed est, et anditaalignit atibust iundandigni dit volu`}
            />
        </div>
    );
}

export default HomePage;