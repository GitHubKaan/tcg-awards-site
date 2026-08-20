import "./sponsors.component.css";
import { useContent } from "../content/content.context";
import { cdnUrl } from "../content/assets";
import { SponsorLogo } from "../content/content.types";

/** A single sponsor logo, wrapped in a link when the logo has an `href`. */
function LogoImage({ logo }: Readonly<{ logo: SponsorLogo }>) {
    const img = <img src={cdnUrl(logo.image)} alt={logo.alt} width={logo.width} />;
    if (!logo.href) return img;
    return (
        <a className="sponsor-link clickable" href={logo.href} target="_blank" rel="noopener noreferrer">
            {img}
        </a>
    );
}

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
                    <LogoImage key={i} logo={logo} />
                ))}
            </div>

            {sponsors.tiers?.map((tier, ti) => (
                <div key={ti} className="sponsors-tier flex column items-center center gap-3">
                    <h2 className="sponsors-tier-heading">{tier.heading}</h2>
                    <div className="flex wrap gap-4 items-center center">
                        {tier.logos.map((logo, i) => (
                            <LogoImage key={i} logo={logo} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
        {/* <div className="background" /> */}
    </div>
}

export default SponsorsComponent;
