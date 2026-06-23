import "./jury.page.css";
import { useContent } from "../content/content.context";
import { cdnUrl } from "../content/assets";
import { JuryMember } from "../content/content.types";

function JuryCard({ member }: { member: JuryMember }) {
    return (
        <div className="jury-card no-select">
            <div className="jury-image">
                <img src={cdnUrl(member.image)} alt={member.name} />
            </div>
            <h3 className="jury-name">{member.name}</h3>
            <p className="jury-role">{member.role}</p>
        </div>
    );
}

function JuryPage() {
    const { jury } = useContent();

    return (
        <div id="jury-page" className="default-page">
            <div className="w-100 flex column items-center gap-3">
                {/* Header */}
                <div className="jury-header">
                    <h1>{jury.title}</h1>
                    <div className="jury-line" />
                    <p>{jury.subtitle}</p>
                </div>

                {/* Members */}
                <div className="jury-grid">
                    {jury.members.map((member, i) => (
                        <JuryCard key={i} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JuryPage;
