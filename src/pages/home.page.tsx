import "./home.page.css";
import Logo from "../assets/logo_text.png";
import InfoBoxComponent from "../components/infoBox.component";

function HomePage() {
    return (
        <div id="home-page" className="default-page">
            <img className="mt-5" src={Logo} alt="logo" width={400} />

            <InfoBoxComponent
                title={{
                    top: "WHY WE\nCREATED THE",
                    bottom: "TCG AWARDS"
                }}
                text={`Trading Card Games are more than products. They are culture, creativity, competition, community and craftsmanship.
                
                Over the past decades, the TCG ecosystem has evolved into a global industry powered by visionary game designers, passionate publishers, dedicated retaileres, elite players, artists, collectors, event organizers and content creators. Yet despite its scale, innovation and cultural impact, there has never been adedicated platform that formally recognizes excellence across the entire Trading Card Game landscape.

                That changes now.`}
            />

            
        </div>
    );
}

export default HomePage;