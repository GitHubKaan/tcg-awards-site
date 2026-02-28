import "./newsletter.component.css";

/**
 * @param className Further class names
 * @param key Further keys
 * @return NewsletterComponent component
 */
function NewsletterComponent(
    props: Readonly<{
        className?: string;
        [key: string]: any;
    }>
) {
    const { className, ...overflowProps } = props;

    const FORM_ACTION = "https://seu2.cleverreach.com/f/394092-424155/wcs/";

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
                const isEmpty = field.value.trim() === "";

                if (
                    field instanceof HTMLInputElement &&
                    (field.type === "checkbox" || field.type === "radio")
                ) {
                    const parent = field.closest(".cr_ipe_item");
                    if (parent && !parent.querySelector<HTMLInputElement>(":checked")) {
                        parent.classList.add("clever_form_error");
                    }
                } else if (isEmpty) {
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
            const isUnsubscribe =
                (form.querySelector<HTMLInputElement>(
                    "input[name=cr_subunsubscribe][value='false']"
                )?.checked) ?? false;

            if (!isUnsubscribe) {
                try {
                    const checkUrl =
                        FORM_ACTION.replace("wcs", "check_email") +
                        window.btoa(emailField.value);
                    const resp = await fetch(checkUrl);
                    const data = await resp.text();
                    if (data) {
                        emailField.classList.add("clever_form_error");
                        const note = document.createElement("div");
                        note.className = "clever_form_note cr_font";
                        note.textContent = data;
                        emailField.insertAdjacentElement("beforebegin", note);
                    }
                } catch {
                    // network error → ignore, let form proceed
                }
            }
        }

        // ── 4. Captcha-Check ───────────────────────────────────────────────
        const captchaField = form.querySelector<HTMLInputElement>("input[name=captcha]");
        if (captchaField?.value) {
            try {
                const checkUrl =
                    FORM_ACTION.replace("wcs", "check_captcha") + captchaField.value;
                const resp = await fetch(checkUrl);
                const data = await resp.text();
                if (data) {
                    captchaField.classList.add("clever_form_error");
                    const note = document.createElement("div");
                    note.style.display = "block";
                    note.className = "clever_form_note cr_font";
                    note.textContent = data;
                    captchaField.insertAdjacentElement("afterend", note);
                }
            } catch {
                // network error → ignore
            }
        }

        // ── 5. Bei Fehlern abbrechen ───────────────────────────────────────
        if (form.querySelectorAll(".clever_form_error").length) {
            return;
        }

        // ── 6. Formular absenden (POST in neuem Tab, exakt wie original target="_blank") ──
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
        <div className={`newsletter-component ${className ?? ""}`} {...overflowProps}>
            <form
                className="cr_form cr_font"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="cr_body cr_page cr_font formbox">
                    <div className="editable_content">

                        <h2 className="mb-1">Newsletter</h2>

                        {/* First Name */}
                        <div className="cr_form-component cr_ipe_item musthave">
                            <div className="cr_form-inputgroup">
                                <label htmlFor="cr_input_firstname" className="itemname">
                                    <p>First Name*</p>
                                </label>
                                <input
                                    id="cr_input_firstname"
                                    className="cr_form-input"
                                    type="text"
                                    name="1047581"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className="cr_form-component cr_ipe_item musthave">
                            <div className="cr_form-inputgroup">
                                <label htmlFor="cr_input_lastname" className="itemname">
                                    <p>Last Name*</p>
                                </label>
                                <input
                                    id="cr_input_lastname"
                                    className="cr_form-input"
                                    type="text"
                                    name="1047582"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        {/* Media / Corporate Name */}
                        <div className="cr_form-component cr_ipe_item">
                            <div className="cr_form-inputgroup">
                                <label htmlFor="cr_input_media" className="itemname">
                                    <p>Media / Corporate Name</p>
                                </label>
                                <input
                                    id="cr_input_media"
                                    className="cr_form-input"
                                    type="text"
                                    name="1047583"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        {/* Link to Media / Channel / Website */}
                        <div className="cr_form-component cr_ipe_item">
                            <div className="cr_form-inputgroup">
                                <label htmlFor="cr_input_link" className="itemname">
                                    <p>Link to Media / Channel / Website</p>
                                </label>
                                <input
                                    id="cr_input_link"
                                    className="cr_form-input"
                                    type="text"
                                    name="1190912"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        {/* Country */}
                        <div className="cr_form-component cr_ipe_item">
                            <div className="cr_form-inputgroup">
                                <label htmlFor="cr_input_country" className="itemname">
                                    <p>Country</p>
                                </label>
                                <input
                                    id="cr_input_country"
                                    className="cr_form-input"
                                    type="text"
                                    name="1047587"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="cr_form-component cr_ipe_item musthave">
                            <div className="cr_form-inputgroup">
                                <label htmlFor="cr_input_email" className="itemname">
                                    <p>Email*</p>
                                </label>
                                <input
                                    id="cr_input_email"
                                    className="cr_form-input"
                                    type="email"
                                    name="email"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        {/* Privacy notice */}
                        <div className="cr_ipe_item mt-1">
                            <div className="mce_text">
                                <p>
                                    With this you agree to storage and usage of your personal data
                                    in accordance with our{" "}
                                    <a
                                        href="https://spiel-essen.de/en/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        privacy policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="cr_form-component cr_ipe_item submit_container mt-1">
                            <button type="submit" className="cr_button">
                                <h3>Subscribe</h3>
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewsletterComponent;
