import "./voteButton.component.css";

/**
 * @param title
 * @param white Optional; White version
 * @param className Further class names
 * @param key Further keys
 * @return Vote Button component
 */
function VoteButtonComponent(
    props: Readonly<{
        title: string,
        white?: boolean,

        className?: string,
        [key: string]: any
    }>
) {
    const { title, white, className, children, ...overflowProps } = props;

    return <div className={`vote-button-component no-select ${white ? "white" : ""} ${className ?? ""}`} {...overflowProps}>
        <div className="shine" />
        <p>
            {title.split("\n").map((line, i) => (
                <span key={i}>{line}{i < title.split("\n").length - 1 && <br />}</span>
            ))}
        </p>
    </div>
}

export default VoteButtonComponent;