import "./awardsLine.component.css";

/**
 * @param title
 * @param subtitle
 * @param className Further class names
 * @param key Further keys
 * @return Awards Line component
 */
function AwardsLineComponent(
    props: Readonly<{
        title: string,
        subtitle: string,
        // setSomething: (value: boolean) => void,

        className?: string,
        [key: string]: any
    }>
) {
    const { /* setSomething, */ title, subtitle, className, ...overflowProps } = props;

    return <div className={`awards-line-component no-select ${className ?? ""}`} {...overflowProps}> {/* Add "no-select" if needed */}
        <div className="line" />
        <div className="text-container">
            <h5>{title}</h5>
            <p>{subtitle}</p>
        </div>
        <div className="line" />
    </div>
}

export default AwardsLineComponent;