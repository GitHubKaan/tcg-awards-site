import "./infoBox.component.css";

/**
 * Important to note
 * - Use "example-component" as the parent class name to namespace component class names like "background", "list", etc., allowing them to be used globally.
 * - Always add "Component" behind component name (e.g. InputComponent).
 * - When using the standard "layout.css", use "no-select" inside the "example-component" to disable selection.
 * - When using "children"-props always add "example-" before the class name so they wont get inherited (e.g. ".car-component"-component has a ".container"-class, name it ".car-container")
 */

/**
 * @param title top & bottom (use \n for line break)
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