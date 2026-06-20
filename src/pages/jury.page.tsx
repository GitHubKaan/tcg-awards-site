import "./jury.page.css";
import Placeholder from "../assets/placeholder.png";

interface JuryMember {
    name: string;
    role: string;
    image: string;
}

// Replace placeholder data and images with the real jury members.
const jury: JuryMember[] = [
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
    { name: "Member Name", role: "Job Title", image: Placeholder },
];

function JuryCard({ member }: { member: JuryMember }) {
    return (
        <div className="jury-card no-select">
            <div className="jury-image">
                <img src={member.image} alt={member.name} />
            </div>
            <h3 className="jury-name">{member.name}</h3>
            <p className="jury-role">{member.role}</p>
        </div>
    );
}

function JuryPage() {
    return (
        <div id="jury-page" className="default-page">
            <div className="w-100 flex column items-center gap-3">
                {/* Header */}
                <div className="jury-header">
                    <h1>The Jury</h1>
                    <div className="jury-line" />
                    <p>
                        An independent expert jury with professional industry experience evaluates the
                        TCG Awards, ensuring that both passion and professional perspective shape the outcome.
                    </p>
                </div>

                {/* Members */}
                <div className="jury-grid">
                    {jury.map((member, i) => (
                        <JuryCard key={i} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JuryPage;
