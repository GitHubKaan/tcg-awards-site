import "./theEvent.page.css";
import { ReactNode } from "react";
import { useContent } from "../content/content.context";
import AnfahrtMap from "../assets/Anfahrt_TCG_Awards_SPIEL26-1.png";

/** Inline stroke icons for the event-detail cards (mirrors the countdown component). */
const DETAIL_ICONS: Record<"calendar" | "clock" | "pin", ReactNode> = {
    calendar: (
        <>
            <rect x="3" y="4.5" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 2.5v4M16 2.5v4" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3.5 2" />
        </>
    ),
    pin: (
        <>
            <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </>
    ),
};

function TheEventPage() {
    const { home } = useContent();
    const { doorsOpen, showTime, location } = home.countdown;

    type Detail = { icon: "calendar" | "clock" | "pin"; label: string; value: string };
    const details: Detail[] = (
        [
            { icon: "calendar", label: "Date", value: doorsOpen },
            { icon: "clock", label: "Show", value: showTime },
            { icon: "pin", label: "Location", value: location },
        ] as Detail[]
    ).filter((d) => d.value?.trim());

    return (
        <div id="the-event-page" className="default-page">
            <div className="event-hero">
                <h1>The Event</h1>
                <p>Everything you need to know to join us at the TCG Awards.</p>
            </div>

            {details.length > 0 && (
                <div className="event-info no-select">
                    {details.map((d) => (
                        <div className="event-info-card" key={d.label}>
                            <svg
                                className="event-info-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.6}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                {DETAIL_ICONS[d.icon]}
                            </svg>
                            <span className="event-info-label">{d.label}</span>
                            <span className="event-info-value">{d.value}</span>
                        </div>
                    ))}
                </div>
            )}

            <figure className="event-map">
                <img
                    className="event-map-img no-select"
                    src={AnfahrtMap}
                    alt="Lageplan: Anfahrt zum Saal Essen im Congress Center Ost der Messe Essen"
                />
            </figure>

            <div className="event-directions">
                <section className="event-direction-card">
                    <h2 className="event-direction-heading">Anfahrtsbeschreibung Saal Essen</h2>
                    <p className="event-direction-text">
                        Die TCG Awards finden in Saal Essen im Congress Center Ost der Messe Essen statt.
                        Bitte nutzt mit eurem TCG Awards Ticket ab 18 Uhr das Glasfoyer Eingang Ost. Von
                        dort aus nehmt ihr den Eingang der B2B-Lounge im Parkrestaurant in Halle 7 und
                        dort die Treppe hoch in den Saal Essen.
                    </p>
                </section>

                <section className="event-direction-card">
                    <h2 className="event-direction-heading">How to get there</h2>
                    <p className="event-direction-text">
                        The TCG Awards will take place in the Saal Essen in the Congress Center Ost at
                        Messe Essen. Please use your TCG Awards ticket to enter through the East Entrance
                        of the Glass Foyer starting at 6:00 p.m. From there, proceed to the entrance of
                        the B2B Lounge in the Parkrestaurant in Hall 7, and take the stairs up to the Saal
                        Essen.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default TheEventPage;
