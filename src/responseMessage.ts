export class MESSAGE {
    static readonly ERROR = {
        // General
        FORMAT: (value?: string): string => `${value ? `${value} ` : ""}Format ist ungültig.`,
        DUPLICATE: (value?: string): string => `${value ? `${value} ` : ""}existiert bereits.`,
        UNAUTHORIZED: (value?: string): string => `${value ? `${value} ` : ""}nicht autorisiert.`,
        WRONG: (value?: string): string => `${value ? `${value} ` : ""}ist falsch.`,
        NOT_FOUND: (value?: string): string => `${value ? `${value} ` : ""}nicht gefunden.`,
        PARTIALLY_FOUND: (value?: string): string => `${value ? `${value} ` : ""}teilweise gefunden.`,
        REQUIRED: (value?: string): string => `${value ? `${value} ` : ""}ist erforderlich.`,
        UNIQUE: (value?: string): string => `${value ? `${value} ` : ""}muss eindeutig sein.`,
        AVAILABLE: (value?: string): string => `${value ? `${value} ` : ""}ist nicht verfügbar.`,
        AMOUNT_EXCEEDED: (maximum: number, value?: string) => `Die Gesamtsumme${value ? ` für ${value.toLocaleLowerCase()}` : ""} darf ${maximum} nicht überschreiten.`,
        SPECIFIC: (options: string[], value?: string) => `${value ? `${value} ` : ""}muss eines der folgenden enthalten: ${options.join(", ")}.`,
        ALREADY: (value?: string): string => `${value ? `${value} ` : ""}bereits erledigt.`,
        
        // String
        EMPTY: "Wert darf nicht leer sein.",
        STRING: (value?: string): string => `${value ? `${value} ` : ""}muss ein String sein.`,
        REGEX: (value?: string): string => `${value ? `${value} ` : ""}enthält mindestens ein ungültiges Zeichen.`,
        MIN_CHARACTERS: (minimum: number, value?: string): string => `${value ? `${value} ` : ""}muss mindestens ${minimum} Zeichen lang sein.`,
        MAX_CHARACTERS: (maximum: number, value?: string): string => `${value ? `${value} ` : ""}darf nicht länger als ${maximum} Zeichen sein.`,
        SPECIFIC_CHARACTER_LENGTH: (length: number, value?: string): string => `${value ? `${value} ` : ""}muss genau ${length} Zeichen lang sein.`,

        // Integer/Double
        INT: (value?: string): string => `${value ? `${value} ` : ""}muss eine ganze Zahl sein.`,
        DECIMAL: (value?: string): string => `${value ? `${value} ` : ""}darf höchstens zwei Nachkommastellen haben.`,
        MIN_INT: (minimum: number, value?: string) => `${value ? `${value} ` : ""}muss mindestens ${minimum} sein.`,
        MAX_INT: (maximum: number, value?: string) => `${value ? `${value} ` : ""}darf ${maximum} nicht überschreiten.`,
        SPECIFIC_INT_LENGTH: (length: number, value?: string): string => `${value ? `${value} ` : ""}muss eine ${length}-stellige Zahl sein.`,
        RANGE: (minimum: number, maximum: number, value?: string): string => `${value ? `${value} ` : ""}muss zwischen ${minimum} und ${maximum} liegen.`,

        // Boolean
        BOOLEAN: (value?: string): string => `${value ? `${value} ` : ""}needs to be an boolean.`,

        // Specific types
        EMAIL: (value?: string): string => `${value ? `${value} ` : ""}muss eine E-Mail-Adresse sein.`,
        TIMESTAMP: (value?: string): string => `${value ? `${value} ` : ""}muss ein Timestamp sein.`,
    };
}
