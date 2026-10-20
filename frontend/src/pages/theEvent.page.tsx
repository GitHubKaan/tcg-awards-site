import "./theEvent.page.css";
import { ReactNode } from "react";
import { useContent } from "../content/content.context";
import AnfahrtMap from "../assets/Anfahrt_TCG_Awards_SPIEL26-1.png";

/** Inline stroke icons for the event-detail cards (mirrors the countdown component). */
const DETAIL_ICONS: Record<"calendar" | "clock" | "pin" | "users" | "shirt", ReactNode> = {
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
    users: (
        <>
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
            <path d="M16 5.2a3.2 3.2 0 0 1 0 6.1M17.5 20a5.5 5.5 0 0 0-3-4.9" />
        </>
    ),
    shirt: (
        <>
            <path d="M8 3.5 4 6l1.5 3L8 8.2V20h8V8.2L18.5 9 20 6l-4-2.5-4 2.5z" />
        </>
    ),
};

type DetailIcon = "calendar" | "clock" | "pin" | "users" | "shirt";
type Detail = { icon: DetailIcon; label: string; value: string };

/** Shared inline stroke-icon renderer for the event cards / schedule slots. */
function EventIcon({ icon, className }: Readonly<{ icon: DetailIcon; className: string }>) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {DETAIL_ICONS[icon]}
        </svg>
    );
}

function TheEventPage() {
    const { theEvent } = useContent();
    const {
        heroTitle,
        heroText,
        date,
        networking,
        showTime,
        location,
        dressCode,
        directionsHeadingDe,
        directionsTextDe,
        directionsHeadingEn,
        directionsTextEn,
    } = theEvent;

    // Time-based entries get their own highlighted schedule strip.
    const schedule: Detail[] = (
        [
            { icon: "users", label: "Networking", value: networking },
            { icon: "clock", label: "Show", value: showTime },
        ] as Detail[]
    ).filter((d) => d.value?.trim());

    const details: Detail[] = (
        [
            { icon: "calendar", label: "Date", value: date },
            { icon: "pin", label: "Location", value: location },
            { icon: "shirt", label: "Dress code", value: dressCode },
        ] as Detail[]
    ).filter((d) => d.value?.trim());

    return (
        <div id="the-event-page" className="default-page">
            <div className="event-hero">
                <h1>{heroTitle}</h1>
                {heroText?.trim() && <p>{heroText}</p>}
            </div>

            {schedule.length > 0 && (
                <div className="event-schedule no-select">
                    {schedule.map((s) => (
                        <div className="event-schedule-slot" key={s.label}>
                            <EventIcon icon={s.icon} className="event-schedule-icon" />
                            <div className="event-schedule-text">
                                <span className="event-schedule-label">{s.label}</span>
                                <span className="event-schedule-time">{s.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {details.length > 0 && (
                <div className="event-info no-select">
                    {details.map((d) => (
                        <div className="event-info-card" key={d.label}>
                            <EventIcon icon={d.icon} className="event-info-icon" />
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
                {directionsTextDe?.trim() && (
                    <section className="event-direction-card">
                        <h2 className="event-direction-heading">{directionsHeadingDe}</h2>
                        <p className="event-direction-text">{directionsTextDe}</p>
                    </section>
                )}

                {directionsTextEn?.trim() && (
                    <section className="event-direction-card">
                        <h2 className="event-direction-heading">{directionsHeadingEn}</h2>
                        <p className="event-direction-text">{directionsTextEn}</p>
                    </section>
                )}
            </div>
        </div>
    );
}

export default TheEventPage;
