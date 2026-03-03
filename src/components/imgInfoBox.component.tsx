import "./imgInfoBox.component.css";
import Instagram from "../assets/socials/instagram.png";
import Twitch from "../assets/socials/twitch.png";
import Facebook from "../assets/socials/facebook.png";
import LinkedIn from "../assets/socials/linkedin.png";

/**
 * @param title optional; top & bottom (use \n for line break)
 * @param text (use \n for line break)
 * @param image
 * @param socials socials icons
 * @param imageInsideBox Put image inside box
 * @param className Further class names
 * @param key Further keys
 * @return Example component
 */
function InfoBoxComponent(
    props: Readonly<{
        title?: {
            top?: string,
            bottom?: string,
        }
        text: string,
        image: string,
        socials?: boolean,
        imageInsideBox?: boolean,

        className?: string,
        [key: string]: any
    }>
) {
    const { className, socials, title, text, imageInsideBox, image, ...overflowProps } = props;

    const borderSize = 5;

    return <div className={`img-info-box-component ${className ?? ""}`} {...overflowProps}>
        <div className="left">
            <div className="mobile-image">
                <img src={image} alt="banner" />
            </div>

            {title && <div>
                {title?.top && <h1>{title?.top}</h1>}
                {title?.bottom && <h1 className="bottom">{title?.bottom}</h1>}
            </div>}
            
            <p>{text}</p>
            
            {socials && <div className="flex gap no-select wrap">
                <a 
                    href="https://www.instagram.com/tcgawards/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img src={Instagram} alt="socials" width={40} height={40} />
                </a>
                <a 
                    href="https://www.twitch.tv/tcgawards" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img src={Twitch} alt="socials" width={40} height={40} />
                </a>
                <a 
                    href="https://www.linkedin.com/company/tcgawards" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img src={LinkedIn} alt="socials" width={40} height={40} />
                </a>
                <a 
                    href="https://www.facebook.com/tcgawards" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img src={Facebook} alt="socials" width={40} height={40} />
                </a>
            </div>}
        </div>

        <div className={`right no-select ${imageInsideBox ? "image-inside-box" : ""}`}>
            <div>
                <div
                    style={{
                        width: `calc(100% - (${borderSize}px * 2))`,
                        height: `calc(100% - (${borderSize}px * 2))`,
                    }}
                >
                    <img src={image} alt="banner" />
                </div>
            </div>
        </div>
    </div>
}

export default InfoBoxComponent;