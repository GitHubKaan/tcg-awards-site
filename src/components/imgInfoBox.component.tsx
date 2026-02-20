import "./imgInfoBox.component.css";

/**
 * @param title optional; top & bottom (use \n for line break)
 * @param text (use \n for line break)
 * @param image
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

        className?: string,
        [key: string]: any
    }>
) {
    const { className, title, text, image, ...overflowProps } = props;

    const borderSize = 5;

    return <div className={`img-info-box-component ${className ?? ""}`} {...overflowProps}> {/* Add "no-select" if needed */}
        <div className="left">
            <div className="mobile-image">
                <img src={image} alt="banner" />
            </div>

            {title && <div>
                {title?.top && <h1>{title?.top}</h1>}
                {title?.bottom && <h1 className="bottom">{title?.bottom}</h1>}
            </div>}
            <p>{text}</p>
        </div>

        <div className="right">
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