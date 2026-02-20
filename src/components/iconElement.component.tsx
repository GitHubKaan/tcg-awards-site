import "./iconElement.component.css";

/**
 * @param image
 * @param title
 * @param className Further class names
 * @param key Further keys
 * @return Icon-Element component
 */
function IconElementComponent(
    props: Readonly<{
        image: string,
        title: string

        className?: string,
        [key: string]: any
    }>
) {
    const { image, title, className, ...overflowProps } = props;

    return <div className={`icon-element-component no-select ${className ?? ""}`} {...overflowProps}>
        <img src={image} alt="icon" height={150} />
        <h3 className="text-center">{title}</h3>
    </div>
}

export default IconElementComponent;