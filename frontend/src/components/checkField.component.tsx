import "./checkField.component.css";
import Checkmark from "../assets/symbols/checkmark.png";

/**
 * @param selected
 * @param setSelected  
 * @param square square or circle?
 * @param size default: 30px
 * @param title
 * @param unclickable Make it unclickable
 * @param className Further class names
 * @param key Further keys
 * @return Checkfield component
 */
function CheckfieldComponent(
    props: Readonly<{
        selected: boolean,
        setSelected?: (value: boolean) => void,

        square?: boolean,
        size?: number,

        title?: string,

        unclickable?: boolean,

        className?: string,
        [key: string]: any
    }>
) {
    const { selected, setSelected, square, size, title, unclickable, className, ...overflowProps } = props;

    const finalSize: string = size ? `${size}px` : "30px";

    return <div
        className={`check-field-component no-select ${className ?? ""}`}
        onClick={() => setSelected && setSelected(!selected)}
    >
        <div
            className={`checkbox ${className ?? ""} ${selected ? "selected" : ""} ${unclickable ? "unclickable" : ""}`}
            style={{
                width: finalSize,
                minWidth: finalSize,
                maxWidth: finalSize,
                height: finalSize,
                minHeight: finalSize,
                maxHeight: finalSize,
                borderRadius: square ? `calc(${finalSize} / 4)` : finalSize,
            }}
            {...overflowProps}
        >
            {(selected && square) && <img
                src={Checkmark}
                alt="checkmark"
                style={{
                    width: `calc(${finalSize} * 0.7)`,
                    minWidth: `calc(${finalSize} * 0.7)`,
                    maxWidth: `calc(${finalSize} * 0.7)`,
                    height: `calc(${finalSize} * 0.7)`,
                    minHeight: `calc(${finalSize} * 0.7)`,
                    maxHeight: `calc(${finalSize} * 0.7)`,
                }}
            />}
        </div>
        {title && <p className="size-16">{title}</p>}
    </div>
}

export default CheckfieldComponent;