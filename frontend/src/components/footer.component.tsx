import "./footer.component.css";
import Logo from "../assets/logo_text.png";
import { Link } from "react-router-dom";
import { useContent } from "../content/content.context";

/**
 * @return Footer component
 */
function FooterComponent() {
    const { footer } = useContent();

    return <div id="footer"> {/* Background */}
        <div> {/* Normal Footer */}
            <Link to="/" className="no-hover">
                <img src={Logo} alt="logo" width={200} />
            </Link>

            <div className="flex gap wrap items-center nav">
                {footer.links.map((link, i) => (
                    <Link key={i} to={link.path} className="no-decoration">
                        <h6>{link.label}</h6>
                    </Link>
                ))}
            </div>
        </div>
    </div>
}

export default FooterComponent;
