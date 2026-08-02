import "./jurySection.component.css";
import { useEffect, useState } from "react";
import { useContent } from "../content/content.context";
import { cdnUrl } from "../content/assets";
import { JuryMember } from "../content/content.types";
import { Portal } from "../utils/portal.util";
import { preventScroll } from "../utils/scroll.util";

function JuryCard({ member, onOpen }: { member: JuryMember; onOpen?: () => void }) {
    const clickable = Boolean(member.description?.trim());
    return (
        <div
            className={`jury-card no-select ${clickable ? "clickable" : ""}`}
            onClick={clickable ? onOpen : undefined}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={
                clickable
                    ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              onOpen?.();
                          }
                      }
                    : undefined
            }
        >
            <div className="jury-image">
                <img src={cdnUrl(member.image)} alt={member.name} />
                {clickable && (
                    <div className="jury-image-overlay">
                        <span>Read bio</span>
                    </div>
                )}
            </div>
            <h3 className="jury-name">{member.name}</h3>
            <p className="jury-role">{member.role}</p>
        </div>
    );
}

function JuryModal({ member, onClose }: { member: JuryMember; onClose: () => void }) {
    // Lock background scroll while the modal is open, and allow Escape to close.
    useEffect(() => {
        preventScroll(true);
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            preventScroll(false);
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <Portal>
            <div className="jury-modal-overlay" onClick={onClose}>
                <div
                    className="jury-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={member.name}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="jury-modal-close no-select" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                    <div className="jury-modal-header">
                        <div className="jury-modal-image no-select">
                            <img src={cdnUrl(member.image)} alt={member.name} />
                        </div>
                        <div className="jury-modal-heading">
                            <h2>{member.name}</h2>
                            <p className="jury-modal-role">{member.role}</p>
                        </div>
                    </div>
                    <div className="jury-modal-line" />
                    <div className="jury-modal-body">
                        {member.description
                            ?.split("\n")
                            .filter((line) => line.trim())
                            .map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                    </div>
                </div>
            </div>
        </Portal>
    );
}

/**
 * The jury, rendered inline on the home page below the product categories.
 * Only renders while the jury is enabled in the admin.
 * @param className Further class names
 * @return Jury section component
 */
function JurySectionComponent(
    props: Readonly<{
        className?: string;
        [key: string]: any;
    }>
) {
    const { className, children, ...overflowProps } = props;
    const { jury } = useContent();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!jury.enabled) return null;

    const openMember = openIndex !== null ? jury.members[openIndex] : null;

    return (
        <div className={`jury-section-component w-100 flex column items-center gap-3 ${className ?? ""}`} {...overflowProps}>
            {/* Header */}
            <div className="jury-header">
                <h1>{jury.title}</h1>
                <div className="jury-line" />
                <p>{jury.subtitle}</p>
            </div>

            {/* Members */}
            <div className="jury-grid">
                {jury.members.map((member, i) => (
                    <JuryCard key={i} member={member} onOpen={() => setOpenIndex(i)} />
                ))}
            </div>

            {openMember && <JuryModal member={openMember} onClose={() => setOpenIndex(null)} />}
        </div>
    );
}

export default JurySectionComponent;
