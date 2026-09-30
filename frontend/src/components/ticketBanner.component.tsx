import "./ticketBanner.component.css";

const TICKET_URL = "https://www.messe-ticket.de/SWM_SHOP/Spiel2026/Shop?assortment=d0a75f84-2e33-f111-9cf9-9440c96c4260";

/**
 * Eye-catching top bar linking to the gala ticket shop.
 * Rendered once at the very top of every marketing page via the Layout.
 * @param className Further class names
 * @param key Further keys
 * @return Ticket Banner component
 */
function TicketBannerComponent(
    props: Readonly<{
        className?: string,
        [key: string]: any
    }>
) {
    const { className, children, ...overflowProps } = props;

    return <a
        className={`ticket-banner-component no-select ${className ?? ""}`}
        href={TICKET_URL}
        target="_blank"
        rel="noopener noreferrer"
        {...overflowProps}
    >
        <div className="ticket-banner-shine" />
        <p className="ticket-banner-text">
            🎟️ Buy a ticket to attend our gala
        </p>
        <span className="ticket-banner-cta">Get tickets →</span>
        <span className="ticket-banner-arrow" aria-hidden="true">→</span>
    </a>
}

export default TicketBannerComponent;
