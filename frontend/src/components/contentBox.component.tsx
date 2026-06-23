import "./contentBox.component.css";
import LineComponent from "./line.component";

/**
 * @param image
 * @param title
 * @param text
 * @param className Further class names
 * @param key Further keys
 * @return Content box component
 */
function ContentBoxComponent(
    props: Readonly<{
        image: string,
        title: string,
        text: string,

        className?: string,
        [key: string]: any
    }>
) {
    const { image, title, text, className, ...overflowProps } = props;

    return <div className={`content-box-component ${className ?? ""}`} {...overflowProps}>
        <div className="left" />
        <div className="right">
            <div className="left">
                <div className="image-container">
                    <img className="no-select" src={image} alt="banner" />
                </div>
            </div>
            <div className="right">
                <img className="no-select" src={image} alt="mobile-banner" />
                <h1 className="text-center">{title}</h1>
                <LineComponent />
                <p>{text}</p>
            </div>
        </div>
    </div>
}

export default ContentBoxComponent;