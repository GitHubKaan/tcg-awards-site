import { ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Portal got implemented here because z-index will not work on header, footer etc. (because outside main container)
 * @returns Portal
 */
export function Portal({ children }: { children: ReactNode }) {
    if (typeof window === "undefined") return null;
    
    let portalRoot = document.getElementById("portal-root");
    if (!portalRoot) {
        portalRoot = document.createElement("div");
        portalRoot.id = "portal-root";
        document.body.appendChild(portalRoot);
    }

    return createPortal(children, portalRoot);
}