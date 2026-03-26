import "./sponsors.component.css";
import EbayLiveLogo from "../assets/sponsors/ebay_live.png";

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
            <h1>Presented by</h1>
            
            <div className="line" />

            <div className="flex wrap gap-4 items-center center">
                <img src={EbayLiveLogo} alt="ebay live logo" width={400} />
            </div>
        </div>
        {/* <div className="background" /> */}
    </div>
}

export default SponsorsComponent;