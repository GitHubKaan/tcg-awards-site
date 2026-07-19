// Country options for the CleverReach final-voting form, sourced from the
// countries-list package (ISO 3166-1, English names) instead of a hand-rolled
// list. CleverReach stores the submitted name as free text (field 1047587).

import { countries } from "countries-list";

export const VOTING_COUNTRIES: string[] = Object.values(countries)
    .map((c) => c.name)
    .sort((a, b) => a.localeCompare(b));
