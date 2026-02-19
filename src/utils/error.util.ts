import { StatusCodes } from "http-status-codes";
import { BaseErrorPage } from "../types/errorPage.type";

/**
 * Validation error
 * @param description Error description
 * @param label Label (e. g. email, name etc.)
 * @return statusCode; description; label
 */
export class ValidationError extends Error {
    statusCode: number;
    description: string;
    label: string;

    constructor(description: string, label: string) {
        super("validation");
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.description = description;
        this.label = label;
    }
}

/**
 * Redirect to specific error page
 * @param params BaseErrorPage-Parameters
 * @param returnPath Only return path
 */
export function redirectToErrorPage(params: BaseErrorPage, returnPath?: boolean): string | undefined {
    if (window.location.pathname === '/error') {
        return;
    }
    
    const title: string = `/error?title=${params.title}`;
    const message: string = params.message ? `&message=${params.message}` : ""; // Optional
    const offerSupport: string = params.offerSupport ? `${params.offerSupport ? `&offer-support=true` : ""}` : ""; // Optional
    const disableReturn: string = params.disableReturn ? `${params.disableReturn ? `&disable-return=true` : ""}` : ""; // Optional

    if (params.backend) { // For backend
        const statusCode: string = `&status-code=${params.backend.statusCode}`;
        const uuid: string = params.uuid ? `&uuid=${params.uuid}` : ""; // Optional
        const until: string = params.backend.until ? `&until=${params.backend.until}` : ""; // Optional
        
        const path = `${title}${message}${offerSupport}${disableReturn}${statusCode}${uuid}${until}`;
        if (returnPath) {
            return path;
        } else {
            window.location.href = path;
        }
        return;
    }
    
    const path = `${title}${message}${offerSupport}${disableReturn}`; // For frontend
    if (returnPath) {
        return path;
    } else {
        window.location.href = path;
    }
}