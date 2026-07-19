import "./vote.page.css";
import { useEffect } from "react";
import FinalVotingComponent from "../components/finalVoting.component";
import { useContentState } from "../content/content.context";
import { redirectToErrorPage } from "../utils/error.util";

function VotePage() {
    const { content, loading } = useContentState();
    const { voting } = content;

    // The defaults ship with voting disabled, so wait for the backend content
    // before deciding — otherwise every reload would redirect too early.
    useEffect(() => {
        if (!loading && !voting.enabled) {
            redirectToErrorPage({ title: "Page not found" });
        }
    }, [loading, voting.enabled]);

    if (loading || !voting.enabled) {
        return <div id="vote-page" className="default-page" />;
    }

    return (
        <div id="vote-page" className="default-page">
            <div className="vote-hero-section">
                <h1>{voting.heading}</h1>
                {voting.ctaDeadline && (
                    <span className="vote-deadline-pill no-select">{voting.ctaDeadline}</span>
                )}
                {voting.introText && <p className="vote-intro">{voting.introText}</p>}
                {voting.voteNote && (
                    <div className="vote-note">
                        <p>{voting.voteNote}</p>
                    </div>
                )}
            </div>

            <FinalVotingComponent />
        </div>
    );
}

export default VotePage;
