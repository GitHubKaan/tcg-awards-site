import { CookieKeyType } from "../enums/cookies.enum";
import Cookies from "js-cookie";
import { CookiesStoredValue } from "../types/cookie.type";

export class CookieStorage {
    /**
     * Set value into cookies
     * @param key CookieKeyType
     * @param value any
     * @param expiresInSeconds optional; exiration in seconds
     */
    static set(
        key: string,
        value: any,
        expiresInSeconds?: number
    ): void {
        const currentDate: number = Date.now();

        const data = {
            value,
            created: currentDate,
        };

        let options: Cookies.CookieAttributes = {};

        if (expiresInSeconds) {
            options.expires = expiresInSeconds / 60 / 60 / 24; // Seconds -> Days
        }

        Cookies.set(key, JSON.stringify(data), options);
    }

    /**
    * Get data from cookies
    * @param key CookieKeyType
    * @returns data or undefined
    */
    static get(key: CookieKeyType): CookiesStoredValue | undefined {
        const raw = Cookies.get(key);
        if (raw) return JSON.parse(raw);
    }

    /**
     * Delete a cookie by key
     * @param key CookieKeyType
     */
    static delete(key: CookieKeyType): void {
        Cookies.remove(key);
    }
}