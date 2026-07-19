import "./finalVoting.component.css";
import { useState } from "react";
import { useContent } from "../content/content.context";
import { VOTING_COUNTRIES } from "../content/countries";

/**
 * Final community voting form (CleverReach). TypeScript conversion of the
 * original jQuery embed script — same validation flow: musthave check,
 * CleverReach check_email, then a hidden-form POST in a new tab. Vote
 * uniqueness per email is enforced server-side by CleverReach.
 *
 * The classes `musthave`, `clever_form_error` and `clever_form_note` are
 * functional hooks used by the validation logic — keep them when restyling.
 *
 * @param className Further class names
 * @param key Further keys
 * @return FinalVotingComponent component
 */
function FinalVotingComponent(
    props: Readonly<{
        className?: string;
        [key: string]: any;
    }>
) {
    const { className, ...overflowProps } = props;
    const { voting } = useContent();

    // Tracks the picked option per category index for the chosen-state styling
    // and the progress counter; submission still reads the form via FormData.
    const [selections, setSelections] = useState<Record<number, string>>({});
    const chosenCount = voting.categories.filter(
        (_, i) => selections[i] && selections[i] !== voting.placeholderOption
    ).length;

    const FORM_ACTION = voting.formAction;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;

        // ── 1. Fehlerklassen zurücksetzen ──────────────────────────────────
        form.querySelectorAll<HTMLElement>(".clever_form_error").forEach((el) =>
            el.classList.remove("clever_form_error")
        );
        form.querySelectorAll<HTMLElement>(".clever_form_note").forEach((el) =>
            el.remove()
        );

        // ── 2. Pflichtfelder prüfen ────────────────────────────────────────
        form.querySelectorAll<HTMLElement>(".musthave").forEach((group) => {
            group.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
                "input, textarea"
            ).forEach((field) => {
                if (field.value.trim() === "") {
                    field.classList.add("clever_form_error");
                }
            });
        });

        // ── 3. E-Mail-Duplikat-Check (CleverReach) ─────────────────────────
        const emailField = form.querySelector<HTMLInputElement>("input[name=email]");
        const isCleverReach =
            FORM_ACTION.indexOf(window.location.hostname) > 0 &&
            FORM_ACTION.indexOf("wcs") > 0;

        // CleverReach check_email is only relevant when the form is hosted
        // on the same domain – on external domains we skip it (same as original).
        if (isCleverReach && emailField?.value) {
            try {
                const checkUrl =
                    FORM_ACTION.replace("wcs", "check_email") +
                    window.btoa(emailField.value);
                const resp = await fetch(checkUrl);
                const data = await resp.text();
                if (data) {
                    emailField.classList.add("clever_form_error");
                    const note = document.createElement("div");
                    note.className = "clever_form_note";
                    note.textContent = data;
                    emailField.insertAdjacentElement("beforebegin", note);
                }
            } catch {
                // network error → ignore, let form proceed
            }
        }

        // ── 4. Bei Fehlern abbrechen ───────────────────────────────────────
        if (form.querySelectorAll(".clever_form_error").length) {
            return;
        }

        // ── 5. Formular absenden (POST in neuem Tab, exakt wie original target="_blank") ──
        const data = new FormData(form);

        const hiddenForm = document.createElement("form");
        hiddenForm.method = "post";
        hiddenForm.action = FORM_ACTION;
        hiddenForm.target = "_blank";
        hiddenForm.style.display = "none";

        data.forEach((value, key) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value as string;
            hiddenForm.appendChild(input);
        });

        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
        document.body.removeChild(hiddenForm);
    }

    return (
        <div className={`final-voting-component ${className ?? ""}`} {...overflowProps}>
            <form className="final-voting-form" onSubmit={handleSubmit} noValidate>

                {/* Category cards */}
                <div className="final-voting-grid">
                    {voting.categories.map((cat, i) => {
                        const chosen =
                            !!selections[i] && selections[i] !== voting.placeholderOption;
                        return (
                            <div
                                key={i}
                                className={`final-voting-card ${chosen ? "chosen" : ""}`}
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <span className="final-voting-card-index no-select">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="final-voting-card-check no-select">✓</span>
                                <label
                                    className="final-voting-card-label"
                                    htmlFor={`final-voting-category-${i}`}
                                >
                                    {cat.label}
                                </label>
                                <div className="final-voting-select-wrap">
                                    <select
                                        id={`final-voting-category-${i}`}
                                        name={cat.fieldName}
                                        value={selections[i] ?? voting.placeholderOption}
                                        onChange={(e) =>
                                            setSelections((s) => ({ ...s, [i]: e.target.value }))
                                        }
                                    >
                                        <option value={voting.placeholderOption}>
                                            {voting.placeholderOption}
                                        </option>
                                        {cat.options
                                            .filter((o) => o.trim() !== "")
                                            .map((option, j) => (
                                                <option key={j} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Voter details */}
                <div className="final-voting-details">
                    {voting.detailsNote && (
                        <p className="final-voting-details-note">{voting.detailsNote}</p>
                    )}

                    <div className="final-voting-details-grid">
                        <div className="final-voting-field musthave">
                            <label htmlFor="final-voting-firstname">{voting.firstNameLabel}</label>
                            <input
                                id="final-voting-firstname"
                                type="text"
                                name="1047581"
                                placeholder=""
                            />
                        </div>

                        <div className="final-voting-field musthave">
                            <label htmlFor="final-voting-lastname">{voting.lastNameLabel}</label>
                            <input
                                id="final-voting-lastname"
                                type="text"
                                name="1047582"
                                placeholder=""
                            />
                        </div>

                        <div className="final-voting-field">
                            <label htmlFor="final-voting-country">{voting.countryLabel}</label>
                            <div className="final-voting-select-wrap">
                                <select
                                    id="final-voting-country"
                                    name="1047587"
                                    defaultValue={voting.countryPlaceholder}
                                >
                                    <option value={voting.countryPlaceholder}>
                                        {voting.countryPlaceholder}
                                    </option>
                                    {VOTING_COUNTRIES.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="final-voting-field musthave">
                            <label htmlFor="final-voting-email">{voting.emailLabel}</label>
                            <input
                                id="final-voting-email"
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="final-voting-submit-row">
                    <p className="final-voting-progress no-select">
                        {chosenCount} / {voting.categories.length} votes selected
                    </p>
                    <button type="submit" className="final-voting-submit">
                        {voting.submitLabel}
                    </button>
                </div>

            </form>
        </div>
    );
}

export default FinalVotingComponent;
