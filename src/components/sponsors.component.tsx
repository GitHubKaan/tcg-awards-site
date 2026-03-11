import "./sponsors.component.css";
import GoogleLogo from "../assets/sponsors/google.svg";
import BlackRockLogo from "../assets/sponsors/blackrock.svg";
import FacebookLogo from "../assets/sponsors/facebook.png";

/**
 * @param className Further class names
 * @param key Further keys
 * @return Sponsors component
 */
function SponsorsComponent(
    props: Readonly<{

        className?: string,
        [key: string]: any
    }>
) {
    const { className, ...overflowProps } = props;

    return <div className={`sponsors-component no-select ${className ?? ""}`} {...overflowProps}>
        <div className="content">
            <h1>Sponsors</h1>
            
            <div className="flex wrap gap-4 items-center center">
                <a href="https://www.google.com" target="_blank">
                    <img src={GoogleLogo} alt="google logo" width={250} />
                </a>
                <a href="https://www.google.com" target="_blank">
                    <img src={BlackRockLogo} alt="google logo" width={250} />
                </a>
                <a href="https://www.google.com" target="_blank">
                    <img src={FacebookLogo} alt="google logo" width={250} />
                </a>
            </div>
        </div>
        <div className="background" />
    </div>
}

export default SponsorsComponent;