import { JSX } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FooterComponent from "../components/footer.component";
import HeaderComponent from "../components/header.component";
import CookieBannerComponent from "../components/cookieBanner.component";
import { ENV } from "./envReader.util";
import Background from "../components/background.component";

/**
 * @param page
 * @param header
 * @param footer Further props: minimal
 * @param background Further props: seed
 * @returns Layout
 */
function Layout(
    props: Readonly<{
        page: JSX.Element,
        header?: boolean,
        footer?: boolean,
        background?: {
            seed?: number
        },
    }
    >): JSX.Element {
    const { 
        page,
        header,
        footer,
        background,
    } = props;

    return <>
        {/* Content */}
        {ENV.MAINTENANCE ?
            <div id="maintenance">
                <h2>Wartungsarbeiten... Wir sind in kürze wieder online!</h2>
                <a href={`mailto:${ENV.SUPPORT_MAIL}`}>{ENV.SUPPORT_MAIL}</a>
            </div>
            :
            <SkeletonTheme baseColor="var(--gray-32)" highlightColor="var(--gray-50)">
                <div className="body-container">
                    {background ? <Background seed={background.seed}>
                        {header && <HeaderComponent />}

                        {page}
                    </Background> : <>
                        {header && <HeaderComponent />}

                        {page}
                    </>}
                </div>

                {footer && <FooterComponent />}

                {/* <CookieBannerComponent /> */}
            </SkeletonTheme>
        }
    </>
}

export default Layout;