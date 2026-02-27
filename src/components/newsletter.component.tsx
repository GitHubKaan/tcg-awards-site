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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Validate required fields
        let hasError = false;
        form.querySelectorAll<HTMLInputElement>(".musthave input").forEach((input) => {
            if (!input.value.trim()) {
                input.classList.add("clever_form_error");
                hasError = true;
            } else {
                input.classList.remove("clever_form_error");
            }
        });

        if (hasError) return;

        // Submit to CleverReach
        const target = "https://seu2.cleverreach.com/f/394092-424155/wcs/";
        const params = new URLSearchParams();
        formData.forEach((value, key) => params.append(key, value as string));

        // Open in new tab (matching original target="_blank" behavior)
        const submitUrl = `${target}?${params.toString()}`;
        console.log(submitUrl)
        window.open(submitUrl, "_blank");
    };

    return (
        <div className={`newsletter-component ${className ?? ""}`} {...overflowProps}>
            <form
                className="cr_form cr_font"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="cr_body cr_page cr_font formbox">
                    <div className="editable_content">
                        
                        <h2 className="mb-1">Newsletter abonnieren</h2>

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