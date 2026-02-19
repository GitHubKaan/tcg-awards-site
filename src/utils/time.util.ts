export class TimeUtil {
    /**
     * Get current Datetime (Needs to be an function, will not update as a const)
     * @returns Current Datetime
     */
    static getCurrentDateTime(): number {
        return new Date().getTime();
    }

    /**
     * Get current Timestamp (Needs to be an function, will not update as a const)
     * @returns Current Timestamp
     */
    static getCurrentTimestamp(): string {
        return this.toTimestamp(this.getCurrentDateTime());
    }

    /**
     * Convert to timestamp
     * @returns Current Timestamp
     */
    static convertToTimestamp(time: number): string {
        return this.toTimestamp(time);
    }

    /**
     * Convert time to timestamp
     * @param time Time (current time -- not UTC)
     * @param database For database? (optional)
     * @returns Timestamp
     */
    static toTimestamp(time: number, database?: boolean): string {
        const timestamp = new Date(time);

        if (database) {
            return timestamp.toISOString().slice(0, 19).replace("T", " ");
        }
        return timestamp.toLocaleString();
    }

    /**
     * From 1.8.2025, 04:10:53 to 01.08.2025, 04:10
     * @param timestamp 
     * @param database 
     * @returns Formatted timestamp
     */
    static formatTimestamp(timestamp: string): string {
        const [datePart, timePart] = timestamp.split(', ');
        const [day, month, year] = datePart.split('.').map(Number);

        const pad = (n: number) => n.toString().padStart(2, '0');

        const [hours, minutes] = timePart.split(':');

        return `${pad(day)}.${pad(month)}.${year}, ${hours}:${minutes}`;
    }

    static dbTimeToPayment(dbTime: string): string {
        const cleaned = dbTime.split('.')[0] + "Z";
        const date = new Date(cleaned);

        const pad = (n: number) => n.toString().padStart(2, "0");

        const month = pad(date.getUTCMonth() + 1);
        const day = pad(date.getUTCDate());
        const year = date.getUTCFullYear();
        const hours = pad(date.getUTCHours());
        const minutes = pad(date.getUTCMinutes());

        return `${day}.${month}.${year} ${hours}:${minutes} Uhr`;
    }
}
