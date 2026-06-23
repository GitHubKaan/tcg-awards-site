import { useEffect, useState } from "react";
import { StoredValue } from "../types/localStorage.type";
import { LocalStorage } from "../utils/localStorage.util";
import "./cookieBanner.component.css"
import { LocalStorageKeyType } from "../enums/localStorage.enum";

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

    const localStorageCookieConsent: StoredValue | undefined = LocalStorage.get(LocalStorageKeyType.CookieConsent);
    useEffect(() => {
        if (localStorageCookieConsent) {
            setShowCookieMessage(false);
        } else if (cookieStatus) {
            LocalStorage.set(LocalStorageKeyType.CookieConsent, cookieStatus);
            setShowCookieMessage(false);
        } else {
            setShowCookieMessage(true);
        }
    }, [cookieStatus])

    return showCookieMessage ? <div className={`cookie-banner-component ${className ?? ""}`} {...overflowProps}>
        <div className="content">
            <p>Diese Webseite verwendet Cookies. Klicke auf Okay um zu Bestätigen.</p>
            <div className="flex gap items-center wrap">
                <a onClick={() => setCookieStatus("No")}>Nein</a>
                <a onClick={() => setCookieStatus("Yes")}>Ja</a>
            </div>
        </div>
    </div> : <></>
}

export default CookieBannerComponent;