import "./countdown.component.css";
import { ReactNode, useEffect, useState } from "react";

/** Milliseconds remaining until `target`, clamped at 0. Empty/invalid -> null. */
function remainingMs(target: string): number | null {
    if (!target) return null;
    const end = new Date(target).getTime();
    if (Number.isNaN(end)) return null;
    return Math.max(0, end - Date.now());
}

function split(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Inline stroke icons for the event-detail cards (no external icon dependency). */
const DETAIL_ICONS: Record<"door" | "clock" | "pin", ReactNode> = {
    door: (
        <path d="M6 3h9a1 1 0 0 1 1 1v16H6V3zm0 0L3 4v16l3 .5M13 11.5v1" />
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

/** Twitch embeds require the exact hostname of the embedding page as `parent`. */
function twitchParent(): string {
    return typeof window !== "undefined" ? window.location.hostname : "localhost";
}

/**
 * Reduces whatever was entered in the admin to a bare Twitch username. Accepts
 * a plain handle ("tcgawards") or a pasted URL ("https://www.twitch.tv/tcgawards/")
 * — an invalid channel is what makes Twitch show "content classification could
 * not be determined", so we normalise it before building the embed URL.
 */
function normalizeChannel(raw?: string): string {
    if (!raw) return "";
    let c = raw.trim();
    const fromUrl = c.match(/twitch\.tv\/([^/?#\s]+)/i);
    if (fromUrl) c = fromUrl[1];
    return c.replace(/^[@/]+|\/+$/g, "").trim();
}

/**
 * Large countdown to a target datetime. While time remains it renders four
 * animated unit cards (days/hours/minutes/seconds); once it reaches zero it
 * shows the live Twitch stream for `twitchChannel` (or, if none is set, the
 * fallback `image`). Renders nothing if no valid target.
 */
export default function CountdownComponent(
    props: Readonly<{
        target: string;
        title?: string;
        subtitle?: string;
        /** Twitch channel (username) embedded when the timer ends. */
        twitchChannel?: string;
        /** Fallback image URL shown at zero when no Twitch channel is set. */
        image?: string;
        /** Message card shown at zero when neither a Twitch channel nor an image is set. */
        fallbackText?: string;
        /** Event detail cards (doors open, show time, venue, …) shown below the running timer. Empty values are skipped. */
        details?: { icon: "door" | "clock" | "pin"; label: string; value: string }[];
        className?: string;
        [key: string]: unknown;
    }>
) {
    const { target, title, subtitle, twitchChannel, image, fallbackText, details, className, ...overflowProps } = props;

    const [ms, setMs] = useState<number | null>(() => remainingMs(target));

    useEffect(() => {
        setMs(remainingMs(target));
        if (!target) return;
        const id = setInterval(() => setMs(remainingMs(target)), 1000);
        return () => clearInterval(id);
    }, [target]);

    if (ms === null) return null;

    if (ms <= 0) {
        const channel = normalizeChannel(twitchChannel);
        return (
            <div className={`countdown-component countdown-done ${className ?? ""}`} {...overflowProps}>
                {channel ? (
                    <div className="countdown-stream">
                        <iframe
                            title="Twitch livestream"
                            src={`https://player.twitch.tv/?channel=${encodeURIComponent(
                                channel
                            )}&parent=${twitchParent()}&autoplay=true`}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : image ? (
                    <img className="countdown-image no-select" src={image} alt="" />
                ) : fallbackText?.trim() ? (
                    <div className="countdown-soon">
                        <span className="countdown-soon-dot" aria-hidden="true" />
                        <span className="countdown-soon-text">{fallbackText}</span>
                    </div>
                ) : null}
            </div>
        );
    }

    const channel = normalizeChannel(twitchChannel);
    const { days, hours, minutes, seconds } = split(ms);
    const units: { value: string; label: string }[] = [
        { value: pad(days), label: days === 1 ? "Day" : "Days" },
        { value: pad(hours), label: "Hours" },
        { value: pad(minutes), label: "Minutes" },
        { value: pad(seconds), label: "Seconds" },
    ];

    return (
        <div className={`countdown-component no-select ${className ?? ""}`} {...overflowProps}>
            {title && <h3 className="countdown-title">{title}</h3>}

            <div className="countdown-units">
                {units.map((u, i) => (
                    <div className="countdown-unit" key={u.label}>
                        <span className="countdown-value">{u.value}</span>
                        <span className="countdown-label">{u.label}</span>
                        {i < units.length - 1 && <span className="countdown-sep">:</span>}
                    </div>
                ))}
            </div>

            {subtitle && <p className="countdown-subtitle">{subtitle}</p>}

            {(() => {
                const items = (details ?? []).filter((d) => d.value?.trim());
                if (items.length === 0) return null;
                return (
                    <div className="countdown-details no-select">
                        {items.map((d, i) => (
                            <div className="countdown-detail" key={d.label} aria-label={`${d.label}: ${d.value}`}>
                                {i > 0 && <span className="countdown-detail-sep" aria-hidden="true" />}
                                <svg
                                    className="countdown-detail-icon"
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
                                <span className="countdown-detail-value">{d.value}</span>
                            </div>
                        ))}
                    </div>
                );
            })()}

            {channel && (
                <a
                    className="countdown-twitch-link clickable"
                    href={`https://www.twitch.tv/${encodeURIComponent(channel)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="countdown-twitch-dot" aria-hidden="true" />
                    Watch live on Twitch
                </a>
            )}
        </div>
    );
}
