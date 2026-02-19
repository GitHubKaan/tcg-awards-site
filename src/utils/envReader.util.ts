import { EnvType, NodeEnv } from "../enums/env.enum";
import { redirectToErrorPage } from "./error.util";

export class ENV {
    // GENERAL
    static readonly NODE_ENV: NodeEnv = envAudit("NODE_ENV", EnvType.String, { specific: Object.values(NodeEnv) });

    static readonly MAINTENANCE: boolean = envAudit("MAINTENANCE", EnvType.Boolean);

    // CONTACT
    static readonly SUPPORT_MAIL: string = envAudit("SUPPORT_MAIL", EnvType.String);
    static readonly SUPPORT_PHONE: string = envAudit("SUPPORT_PHONE", EnvType.String)
}

/**
 * Environment value audit
 * @param key Key-Name
 * @param type Variable type
 * @param specifications Further specifications (optional; exactLength; min; allowedCharacters)
 * @returns Value
 */
function envAudit(
    key: string,
    type: EnvType,
    specifications?: {
        optional?: boolean, // Is optional value
        exactLength?: number, // Exact string length
        min?: number, // Min number
        allowedCharacters?: RegExp, // Allowed characters as Regex
        specific?: string[]
    }
): any { // Needs to be any because some values require numbers, boolean etc. exclusively
    try {
        const value = process.env[`${"REACT_APP_"}${key}`];
        
        let convertedValue: undefined | string | number | boolean = undefined;
        switch (type) {
            case EnvType.String:
                if (value !== undefined && value.trim().length === 0) { // Values with spaces only will be undefined
                    convertedValue = undefined;
                    break;
                }
                convertedValue = value;
                break;
            case EnvType.Boolean: // "Boolean(JSON.prase())" will not be used because 0 & 1 could also be true/false
                if (value === "true") {
                    convertedValue = true;
                } else if (value === "false") {
                    convertedValue = false;
                } else {
                    throw Error(`Environment variable ${key} needs to be a ${type}.`);
                }
                break;
            case EnvType.Number:
                if (!isNaN(Number(value))) {
                    convertedValue = Number(value);
                } else {
                    throw Error(`Environment variable ${key} needs to be a ${type}.`);
                }
                break;
            default: break;
        }

        if (!specifications && convertedValue === undefined) { // Necessary value missing
            throw Error(`Environment variable ${key} is missing.`);
        }

        if (specifications) { // Specification checks
            // Optional check
            if (specifications.optional && convertedValue === undefined) {
                return;
            }

            // exactLength
            if (specifications.exactLength) {
                if (type !== EnvType.String) {
                    throw Error(`Environment variable ${key} can not contain "exactLength" property without being a string.`);
                }
                if (typeof convertedValue !== "string") {
                    throw Error(`Environment variable ${key} needs to be a string if specification contains "exactLength" element.`);
                }
                if (convertedValue.length !== specifications.exactLength) {
                    throw Error(`Environment variable ${key} needs to be ${specifications.exactLength} characters long.`);
                }
            }

            // min
            if (specifications.min) {
                if (type !== EnvType.Number) {
                    throw Error(`Environment variable ${key} can not contain "min" property without being a number.`);
                }
                if (typeof convertedValue !== "number") {
                    throw Error(`Environment variable ${key} needs to be a number if specification contains "min" element.`);
                }
                if (convertedValue < specifications.min) {
                    throw Error(`Environment variable ${key} needs to be bigger or equal to ${specifications.min}.`);
                }
            }

            // allowedCharacters
            if (specifications.allowedCharacters) {
                if (type !== EnvType.String) {
                    throw Error(`Environment variable ${key} must be a string to check for allowed characters.`);
                }
                if (typeof convertedValue === "string") {
                    if (!specifications.allowedCharacters.test(convertedValue)) {
                        throw Error(`Environment variable ${key} contains invalid characters. (Allowed: ${specifications.allowedCharacters})`);
                    }
                }
            }
            
            // specific
            if (specifications.specific) {
                if (type !== EnvType.String) {
                    throw Error(`Environment variable ${key} must be a string to check against specific values.`);
                }
                
                if (typeof convertedValue === "string") {
                    if (!specifications.specific.includes(convertedValue)) {
                        throw Error(`Environment variable ${key} must be one of: ${specifications.specific.join(", ")}`);
                    }
                }
            }
        }

        return convertedValue;
    } catch (error: unknown) {
        redirectToErrorPage({
            title: "Environment file issue",
            message: `${error}`
        })
    }
}