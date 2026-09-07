import "./countdown.component.css";
import { useEffect, useState } from "react";

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
        className?: string;
        [key: string]: unknown;
    }>
) {
    const { target, title, subtitle, twitchChannel, image, fallbackText, className, ...overflowProps } = props;

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
        </div>
    );
}
