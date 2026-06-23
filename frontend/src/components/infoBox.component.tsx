import "./infoBox.component.css";

/**
 * @param title optional; top & bottom (use \n for line break)
 * @param text (use \n for line break)
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

        className?: string,
        [key: string]: any
    }>
) {
    const { className, title, text, ...overflowProps } = props;

    return <div className={`info-box-component ${className ?? ""}`} {...overflowProps}> {/* Add "no-select" if needed */}
        {title && <div className="left">
            {title?.top && <h1>{title?.top}</h1>}
            {title?.bottom && <h1 className="bottom">{title?.bottom}</h1>}
        </div>}

        <div className="right">
            <p>{text}</p>
        </div>
    </div>
}

export default InfoBoxComponent;