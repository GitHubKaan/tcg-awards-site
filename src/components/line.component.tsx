import "./line.component.css";

/**
 * @param className Further class names
 * @param key Further keys
 * @return Line component
 */
function LineComponent(
    props: Readonly<{
        className?: string,
        [key: string]: any
    }>
) {
    const { className, ...overflowProps } = props;

    return <div className={`line-component no-select ${className ?? ""}`} {...overflowProps}>
        <div />
    </div>
}

export default LineComponent;