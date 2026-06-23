import { UUID } from "node:crypto";
import { StatusCodes } from "http-status-codes";

// Error Page
export interface BaseErrorPage {
    title: string;
    message?: string;
    uuid?: UUID;
    offerSupport?: boolean;
    disableReturn?: boolean;
    backend?: {
        statusCode: StatusCodes;
        remainingSeconds?: number;
        until?: string;
    };
}