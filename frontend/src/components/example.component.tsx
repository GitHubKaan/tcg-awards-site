import "./example.component.css";
import { ReactNode } from "react";

/**
 * Important to note
 * - Use "example-component" as the parent class name to namespace component class names like "background", "list", etc., allowing them to be used globally.
 * - Always add "Component" behind component name (e.g. InputComponent).
 * - When using the standard "layout.css", use "no-select" inside the "example-component" to disable selection.
 * - When using "children"-props always add "example-" before the class name so they wont get inherited (e.g. ".car-component"-component has a ".container"-class, name it ".car-container")
 */

/**
 * @param className Further class names
 * @param children Children elements
 * @param key Further keys
 * @return Example component
 */
function ExampleComponent(
    props: Readonly<{
        // setSomething: (value: boolean) => void,

        className?: string,
        children?: ReactNode,
        [key: string]: any
    }>
) {
    const { /* setSomething, */ className, children, ...overflowProps } = props;

    return <div className={`example-component ${className ?? ""}`} {...overflowProps}> {/* Add "no-select" if needed */}
        {children}
    </div>
}

export default ExampleComponent;