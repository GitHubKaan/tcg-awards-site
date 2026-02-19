import "./header.component.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

/**
 * Important: Change mobile screen ratio settings on added options (only one number inside header.component.css)
 * @param className Further class names
 * @param key Further keys
 * @return Header component
 */
function HeaderComponent(
    props: Readonly<{
        className?: string,
        [key: string]: any
    }>
) {
    const { topDistance, className, children, ...overflowProps } = props;

    const routes = [
        { title: "first", path: "/" },
        { title: "second", path: "/second" },
        { title: "third", path: "/third" },
    ];

    const [mobileSelectionVisible, setMobileSelectionVisible] = useState(false);

    return <>
        <div className={`header-component no-select ${className ?? ""} ${mobileSelectionVisible ? "mobile-visible" : ""}`} {...overflowProps}>
            {/* --- MOBILE --- */}
            <div className="mobile">
                <Link to="/" className="logo">
                    <img src={Logo} alt="logo" height={25} />
                </Link>
                <div className={`flex center items-center gap-1`}>
                    <div className="icon">
                        <div/>
                        <div className="hitbox" onClick={() => setMobileSelectionVisible(!mobileSelectionVisible)} />
                        <div/>
                    </div>
                </div>

                <div className="background-body">
                    <Link to="/" onClick={() => setMobileSelectionVisible(false)}>
                        <p className="no-decoration mobile-header">Home</p>
                    </Link>

                    {routes?.map((route: { title: string, path: string }, i: number) => (
                        <Link key={i} to={route.path} onClick={() => setMobileSelectionVisible(false)}>
                            <p className="mobile-header">{route.title}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* --- DESKTOP --- */}
            <div className="header-body">   
                <Link className="option" to="/">
                    <p className="header-title">TCG AWARDS</p>
                    <div className="option-bottom-line" />
                </Link>

                <div className="flex gap">
                    {routes?.map((route: { title: string, path: string }, i: number) => (
                        <Link key={i} className="option" to={route.path}>
                            <h6 className="header-nav">{route.title.toUpperCase()}</h6>
                            <div className="option-bottom-line" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>

        <div className={`header-component-mobile-background ${mobileSelectionVisible ? "mobile-visible" : ""}`} />
    </>
}

export default HeaderComponent;