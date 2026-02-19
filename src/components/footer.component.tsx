import "./footer.component.css";
import Logo from "../assets/logo_text.png";
import { Link } from "react-router-dom";

/**
 * @param minimal For minimalistic footer -- most important links only
 * @return Footer component
 */
function FooterComponent(
    props: Readonly<{
        
    }>
) {
    return <div id="footer"> {/* Background */}
        <div> {/* Normal Footer */}
            <Link to="/" className="no-hover">
                <img src={Logo} alt="logo" width={200} />
            </Link>

            <div className="flex gap wrap items-center nav">
                <Link to="/" className="no-decoration">
                    <h6>datenschutz</h6>
                </Link>
                <Link to="/" className="no-decoration">
                    <h6>impressum</h6>
                </Link>
            </div>
        </div>
    </div>
}

export default FooterComponent;