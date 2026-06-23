import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Stop scroll on render
 * @returns null
 */
export function ScrollToTopOnReload() { //Scroll on top on page render/reload
    const location = useLocation();
    
    useEffect(() => { //Will render on location change or reload
        window.scrollTo(0, 0);
    }, [location]);

    return null;
};

let modalCounter = 0; // FIX: If multiple modals over each other -- there is a issue with scroll, it will get enabled and disabled on each layer this will prevent it

/**
 * Enable/Disable scrolling
 * @param preference change scroll state
 */
export function preventScroll(enable: boolean) {
    document.documentElement.style.scrollBehavior = "auto"; // Disable scroll-behavior temporary

    // For all devices and browsers (global)
    document.body.style.overflow = enable ? "hidden" : "";
    document.documentElement.style.overflow = enable ? "hidden" : "";

    // Fix for Safari on newer iOS-Devices (e. g. iPhone 16 Pro)
    if (enable) { // Disable scroll
        modalCounter++;
        if (modalCounter === 1) {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            document.body.dataset.scrollY = `${scrollY}`;
    
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
        }
    } else { // Enable scroll
        modalCounter = Math.max(0, modalCounter - 1);
        if (modalCounter === 0) {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
        }
    }

    document.documentElement.style.scrollBehavior = "smooth"; // Add scrollbehavior again
}

/**
 * Scroll to top of page
 */
export function scrollToTop() {
    window.scrollTo({ top: 0, left: 0 }); /* behavior: "smooth" */
}