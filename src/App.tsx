import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTopOnReload } from "./utils/scroll.util";
import Layout from "./utils/layout.util";
import ErrorInfo from "./pages/errorInfo.page";
import HomePage from "./pages/home.page";
import ImprintPage from "./pages/imprint.page";
import PrivacyPage from "./pages/privacy.page";
import { ENV } from "./utils/envReader.util";

// Do not change order of CSS imports
// general
import "./App.css";
import "./styles/layout.style.css";
import "./styles/general.style.css";
import "./styles/text.style.css";
import "./styles/colors.style.css";

// Default overwrites
import "./styles/mobile.style.css";

function App() {
    return (
        <>
            <header>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> {/* Stop iPhone auto-zoom in on input/textfields on select */}
            </header>

            <BrowserRouter basename="/tcg-awards-site">
                <ScrollToTopOnReload />

                <Routes>
                    {/* General */}
                    <Route path={`${ENV.PATH ?? ""}/`} element={Layout({ page: <HomePage />, header: true, footer: true, background: {} })} />
                    <Route path={`${ENV.PATH ?? ""}/imprint`} element={Layout({ page: <ImprintPage />, header: true, footer: true, background: {} })} />
                    <Route path={`${ENV.PATH ?? ""}/privacy`} element={Layout({ page: <PrivacyPage />, header: true, footer: true, background: {} })} />
                    
                    {/* Error pages */}
                    <Route path={`*`} element={Layout({ page: <ErrorInfo />, header: true, footer: true, background: {} })} /> {/* 404 Page not found */}
                    <Route path={`${ENV.PATH ?? ""}/error`} element={Layout({ page: <ErrorInfo />, header: true, footer: true, background: {} })} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
