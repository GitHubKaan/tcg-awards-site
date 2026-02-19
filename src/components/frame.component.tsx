import "./frame.component.css";

/**
 * @param image optional;
 * @param title optional; top & bottom (use \n for line break)
 * @param text optional; (use \n for line break)
 * @param className Further class names
 * @param key Further keys
 * @return Example component
 */
function FrameComponent(
    props: Readonly<{
        width: string,
        image?: string,
        title?: {
            top?: string,
            bottom?: string,
        },
        text?: string,

        className?: string,
        [key: string]: any
    }>
) {
    const { width, image, title, text, className, ...overflowProps } = props;

    const borderSize = 5;

    return <div
        className={`frame-component ${className ?? ""}`}
        {...overflowProps}
        style={{
            width: width,
            paddingTop: borderSize,
            paddingBottom: borderSize,
        }}
    >
        <div
            className="content"
            style={{
                width: `calc(${width} - ${borderSize * 2}px - var(--size-l) * 2)`
            }}
        >
            {/* IMAGE */}
            {image && <div className="flex center no-select">
                <img src={image} alt="frame symbol" width={150} />
            </div>}

            {/* TITLE */}
            {title && <div>
                {title?.top && <h2>{title?.top}</h2>}
                {title?.bottom && <h2 className="bottom">{title?.bottom}</h2>}
            </div>}
            
            {/* TEXT */}
            {text && <p>{text}</p>}
        </div>
    </div>
}

export default FrameComponent;