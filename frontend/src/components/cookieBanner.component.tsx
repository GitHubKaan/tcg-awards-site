import "./cookieBanner.component.css"
import { useEffect, useState } from "react";
import { StoredValue } from "../types/localStorage.type";
import { LocalStorage } from "../utils/localStorage.util";
import { LocalStorageKeyType } from "../enums/localStorage.enum";
import { preventScroll } from "../utils/scroll.util";
import { Link } from "react-router-dom";
import Cookie from "../assets/symbols/cookies_icon_white.svg";
import Arrow from "../assets/symbols/arrow.svg";
import CheckfieldComponent from "./checkField.component";

/* eslint-disable react-hooks/exhaustive-deps */

/**
 * @param className Further class names
 * @param key Further keys
 * @return Cookie banner component
 */
function CookieBannerComponent(
    props: Readonly<{
        className?: string,
        [key: string]: any
    }>
) {
    const { className, ...overflowProps } = props;

    const [cookieStatus, setCookieStatus] = useState<string | undefined>(undefined);
    const [showCookieMessage, setShowCookieMessage] = useState<boolean>(false); // Needs to be default false to prevent blinking on page reload

    const [cookiesSettings, setCookiesSettings] = useState<boolean>(false);

    const [all, setAll] = useState<boolean>(false);

    const [functional, setFunctional] = useState<boolean>(false);
    const [analytical, setAnalytical] = useState<boolean>(false);
    const [personalized, setPersonalized] = useState<boolean>(false);

    const localStorageCookieConsent: StoredValue | undefined = LocalStorage.get(LocalStorageKeyType.CookiePreference);
    useEffect(() => {
        if (localStorageCookieConsent) {
            setShowCookieMessage(false);
        } else if (cookieStatus) {
            LocalStorage.set(LocalStorageKeyType.CookiePreference, cookieStatus);
            setShowCookieMessage(false);
        } else {
            setShowCookieMessage(true);
        }
    }, [cookieStatus])

    // Disable scroll only when at least one modal is active
    useEffect(() => {
        if (showCookieMessage) preventScroll(true);
        return () => { if (showCookieMessage) preventScroll(false); };
    }, [showCookieMessage]);

    useEffect(() => {
        const areAllSelected = functional && analytical && personalized;
        setAll(areAllSelected);
    }, [functional, analytical, personalized]);

    return showCookieMessage ? <div className={`cookie-banner-component ${className ?? ""}`} {...overflowProps}>
        <div className="content">
            {cookiesSettings ? <>
                <div className="flex gap">
                    <button onClick={() => setCookiesSettings(false)}>
                        <img alt="back arrow" src={Arrow} width={10} style={{rotate: "180deg"}} />
                    </button>
                    <h2>Manage your settings</h2>
                </div>

                <p>You can find all information in our <Link to="/cookies">Cookie Policy</Link>.</p>

                <CheckfieldComponent selected={all} setSelected={(value: boolean) => {
                    setAll(value);
                    setFunctional(value);
                    setAnalytical(value);
                    setPersonalized(value);
                }} square title="Enable all"/>

                <div className="line" />

                <div className="flex column">
                    <CheckfieldComponent selected={true} setSelected={() => {}} square title="Necessary"/>
                    <p className="description gray">These cookies are necessary to ensure that the website and its functions work properly. The services you have requested cannot be provided without these cookies.</p>
                </div>

                <div className="flex column">
                    <CheckfieldComponent selected={functional} setSelected={setFunctional} square title="Functional"/>
                    <p className="description gray">These cookies allow the website to remember the choices you have made in order to provide you with better functionality and personalized features.</p>
                </div>

                <div className="flex column">
                    <CheckfieldComponent selected={analytical} setSelected={setAnalytical} square title="Analytics"/>
                    <p className="description gray">These analytics cookies, including statistics, are used to understand how visitors interact with the website, allowing us to measure and improve the performance of our website.</p>
                </div>

                <div className="flex column">
                    <CheckfieldComponent selected={personalized} setSelected={setPersonalized} square title="Personalized (targeting and advertising)"/>
                    <p className="description gray">These marketing cookies are used to tailor the information delivered to you to your interests and to measure the effectiveness of such advertising, both on our website and on the websites of our advertising partners.</p>
                </div>

                <button className="type-3" onClick={() => setCookieStatus(`necessary,${functional ? "functional," : ""}${analytical ? "analytical," : ""}${personalized ? "personalized," : ""}`)}>
                    <p>Save</p>
                </button>
            </> : <>
                <div className="cookies-img-container">
                    <img alt="cookie" src={Cookie} width={60} height={60} className="no-select" />
                </div>

                <h2>We use cookies</h2>

                <p>This website uses exclusively technically necessary cookies and – with your consent – optional cookies for functional, analytics and personalized purposes. Necessary cookies are always set. You can find a complete overview of all technologies used in our <Link to="/cookies">Cookie Policy</Link>. Detailed information on data processing is provided in our <Link to="/privacy">Privacy Policy</Link>.</p>

                <div className="button-container no-select">
                    <button className="type-2 equal" onClick={() => setCookieStatus("necessary")}>
                        <p>Necessary only</p>
                    </button>
                    <button className="type-3 equal" onClick={() => setCookieStatus("all")}>
                        <p>Accept all</p>
                    </button>
                </div>
                <div className="settings-link no-select">
                    <button className="type-1" onClick={() => setCookiesSettings(true)}>
                        <p>Custom settings</p>
                    </button>
                </div>
            </>}
        </div>

        <div className="background-blur" />
    </div> : <></>
}

export default CookieBannerComponent;