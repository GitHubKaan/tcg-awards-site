import { LocalStorageKeyType } from "../enums/localStorage.enum";
import { StoredValue } from "../types/localStorage.type";


export class LocalStorage {
    /**
     * Set value into local storage
     * @param key LocalStorageKeyType
     * @param value 
     */
    static set(
        key: LocalStorageKeyType,
        value: any,
    ): void {
        const currentDate: number = Date.now(); 
        
        const data: StoredValue = {
            value,
            created: currentDate
        };

        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Get data from local storage
     * @param key LocalStorageKeyType
     * @returns data or undefined
     */
    static get(key: LocalStorageKeyType): StoredValue | undefined {
        const raw: string | null = localStorage.getItem(key);

        if (!raw) return undefined; // No value found

        try {
            return JSON.parse(raw);
        } catch {
            console.error(`Error while reading the LocalStorage key ${key}.`);
            return undefined;
        }
    }

    /**
     * Delete item from localstorage
     * @param key 
     */
    static delete(key: LocalStorageKeyType) {
        localStorage.removeItem(key);
    }
}