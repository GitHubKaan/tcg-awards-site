import "./trippleBox.component.css";

/**
 * @param firstBox title, text
 * @param secondBox title, text
 * @param thirdBox title, text
 * @param className Further class names
 * @param key Further keys
 * @return Tripple box component
 */
function TrippleBoxComponent(
    props: Readonly<{
        firstBox: {
            title: string,
            text: string
        },
        secondBox: {
            title: string,
            text: string
        },
        thirdBox: {
            title: string,
            text: string
        },

        className?: string,
        [key: string]: any
    }>
) {
    const { firstBox, secondBox, thirdBox, className, ...overflowProps } = props;

    return <div className={`tripple-box-component ${className ?? ""}`} {...overflowProps}>
        <div className="box">
            <h2>{firstBox.title}</h2>
            <p>{firstBox.text}</p>
        </div>
        <div className="box">
            <h2>{secondBox.title}</h2>
            <p>{secondBox.text}</p>
        </div>
        <div className="box">
            <h2>{thirdBox.title}</h2>
            <p>{thirdBox.text}</p>
        </div>
    </div>
}

export default TrippleBoxComponent;