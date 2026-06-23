import "./sponsors.component.css";
import { useContent } from "../content/content.context";
import { cdnUrl } from "../content/assets";

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
    const { sponsors } = useContent();

    return <div className={`sponsors-component no-select ${className ?? ""}`} {...overflowProps}>
        <div className="content">
            <h1>{sponsors.heading}</h1>

            <div className="line" />

            <div className="flex wrap gap-4 items-center center">
                {sponsors.logos.map((logo, i) => (
                    <img key={i} src={cdnUrl(logo.image)} alt={logo.alt} width={logo.width} />
                ))}
            </div>
        </div>
        {/* <div className="background" /> */}
    </div>
}

export default SponsorsComponent;
