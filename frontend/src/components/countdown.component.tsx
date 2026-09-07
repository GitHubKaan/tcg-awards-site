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

/**
 * Large countdown to a target datetime. While time remains it renders four
 * animated unit cards (days/hours/minutes/seconds); once it reaches zero the
 * provided image is shown in its place. Renders nothing if no valid target.
 */
export default function CountdownComponent(
    props: Readonly<{
        target: string;
        title?: string;
        subtitle?: string;
        /** Rendered when the countdown reaches zero. */
        done?: ReactNode;
        className?: string;
        [key: string]: unknown;
    }>
) {
    const { target, title, subtitle, done, className, ...overflowProps } = props;

    const [ms, setMs] = useState<number | null>(() => remainingMs(target));

    useEffect(() => {
        setMs(remainingMs(target));
        if (!target) return;
        const id = setInterval(() => setMs(remainingMs(target)), 1000);
        return () => clearInterval(id);
    }, [target]);

    if (ms === null) return null;

    if (ms <= 0) {
        return (
            <div className={`countdown-component countdown-done ${className ?? ""}`} {...overflowProps}>
                {done}
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
