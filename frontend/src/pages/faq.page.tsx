import "./faq.page.css";
import { useId, useState } from "react";

/** A single answer is a sequence of blocks so we can mix paragraphs and bullet lists. */
type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

interface FaqEntry {
    question: string;
    answer: Block[];
}

interface FaqSection {
    heading: string;
    entries: FaqEntry[];
}

const p = (text: string): Block => ({ type: "p", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });

const FAQ_SECTIONS: FaqSection[] = [
    {
        heading: "General",
        entries: [
            {
                question: "How are the TCG Awards decided?",
                answer: [
                    p("There are three types of TCG Awards, each with its own independent decision process:"),
                    ul(
                        "Community Awards are decided entirely by the community.",
                        "Performance Awards are determined based on competitive performance and official tournament results.",
                        "Brand Awards are decided by an independent international jury."
                    ),
                    p("The three processes are separate from each other."),
                ],
            },
            {
                question: "Does the TCG Awards team select the winners?",
                answer: [
                    p("No. The TCG Awards team administers the different award processes but does not select the winners."),
                    p("For Community Awards, the team checks nominations against the predefined eligibility criteria. For Performance Awards, results are determined through a data-based performance evaluation. For Brand Awards, the independent jury determines the ranking."),
                ],
            },
        ],
    },
    {
        heading: "Community Awards",
        entries: [
            {
                question: "How do the Community Awards work?",
                answer: [
                    p("Community Awards have two stages: Nominations and Final Voting."),
                    p("During the nomination phase, the community can nominate their favorites in each category. After eligibility has been checked, the five eligible nominees with the highest number of nominations become the Top 5."),
                    p("The nomination count is then reset to zero and a new voting round begins between those five finalists."),
                    p("The three nominees receiving the most votes become the Top 3, and the winner is revealed at the TCG Awards."),
                ],
            },
            {
                question: "Who can nominate?",
                answer: [
                    p("Anyone can participate in the nomination phase."),
                    p("Each participant can nominate one nominee per category and can participate once per email address. Participation is verified via email."),
                ],
            },
            {
                question: "How are the Top 5 selected?",
                answer: [
                    p("The Top 5 are based entirely on the number of valid community nominations."),
                    p("After checking that nominees meet the eligibility criteria for their respective category, the five eligible nominees with the highest number of nominations advance."),
                    p("There is no jury vote, weighting or subjective selection by the TCG Awards team."),
                ],
            },
            {
                question: "What happens if a nominee does not meet the eligibility criteria?",
                answer: [
                    p("Each category has predefined eligibility criteria. Nominations that do not meet these criteria are excluded before the Top 5 are determined."),
                    p("The eligibility check is not a subjective evaluation of the nominee or its quality."),
                ],
            },
            {
                question: "Do nominations from the first phase count towards the final result?",
                answer: [
                    p("No."),
                    p("Once the Top 5 have been determined, all nomination counts are reset to zero."),
                    p("The Final Voting is a completely new vote between the Top 5. Previous nomination numbers have no influence on the final result."),
                ],
            },
            {
                question: "How does the Final Voting work?",
                answer: [
                    p("Each participant can cast one vote per category, with participation limited to once per verified email address."),
                    p("The three nominees with the highest number of votes become the Top 3 finalists."),
                    p("The Top 3 are announced in alphabetical order before the Award Show. The final ranking and winner remain confidential until the TCG Awards."),
                ],
            },
            {
                question: "Can nominees ask their communities to vote for them?",
                answer: [
                    p("Absolutely."),
                    p("Community activation is an intentional part of the Community Awards. Nominees are encouraged to tell their communities about their nomination and invite them to participate."),
                    p("This means an engaged community can make a real difference."),
                    p("The Community Awards are designed to reflect the votes that are actually cast — regardless of whether a nominee is one of the biggest names in the industry or a smaller player with a highly engaged community."),
                ],
            },
            {
                question: "Does the TCG Awards team adjust the results if an unexpected nominee receives the most votes?",
                answer: [
                    p("No."),
                    p("As long as a nominee meets the eligibility criteria, the result is determined by the community."),
                    p("The TCG Awards team does not change, curate or override results based on the perceived size, popularity or market position of a nominee."),
                ],
            },
        ],
    },
    {
        heading: "Performance Awards",
        entries: [
            {
                question: "How is Player of the Year determined?",
                answer: [
                    p("Player of the Year is determined through a data-based evaluation of official tournament results across different trading card games."),
                    p("Competitive performances are evaluated and combined to create a comparable overall performance ranking."),
                    p("There is no community or jury vote involved."),
                ],
            },
            {
                question: "What period is considered for Player of the Year?",
                answer: [
                    p("The performance period runs from May 1 to April 30 of the respective award cycle."),
                    p("For example, the 2026 award cycle considers results from May 1, 2025 through April 30, 2026."),
                ],
            },
            {
                question: "Does a jury decide Player of the Year?",
                answer: [
                    p("No."),
                    p("Player of the Year is entirely performance-based. The calculation is cross-checked for accuracy, but there is no subjective jury evaluation of the players."),
                ],
            },
            {
                question: "Is the exact Player of the Year calculation public?",
                answer: [
                    p("No. The detailed weighting and calculation methodology are not publicly disclosed."),
                    p("The ranking is based on official tournament performance and is designed to make competitive performances across different trading card games comparable."),
                ],
            },
            {
                question: "Will there be more Performance Awards in the future?",
                answer: [
                    p("Potentially. Player of the Year is currently the Performance Award category, but additional performance-based categories may be introduced in the future."),
                ],
            },
        ],
    },
    {
        heading: "Brand Awards",
        entries: [
            {
                question: "What are the Brand Award categories?",
                answer: [
                    p("The Brand Awards currently consist of three categories:"),
                    ul(
                        "Service Provider of the Year",
                        "Campaign of the Year",
                        "Brand Partnership of the Year"
                    ),
                ],
            },
            {
                question: "Who can submit a Brand Award case?",
                answer: [
                    p("Any company can submit a case."),
                    p("Companies may submit multiple cases and can participate in multiple Brand Award categories."),
                ],
            },
            {
                question: "How are Brand Award winners selected?",
                answer: [
                    p("Brand Award cases are evaluated by an independent international jury of industry and subject-matter experts from different regions of the world."),
                    p("Jurors evaluate the eligible cases independently."),
                    p("In each category, every eligible juror awards:"),
                    ul(
                        "5 points to their first choice",
                        "3 points to their second choice",
                        "1 point to their third choice"
                    ),
                    p("Each score can only be awarded once per category."),
                    p("All jury points are then combined to determine the final ranking. The three highest-ranked cases become the Top 3, with the winner revealed at the TCG Awards."),
                ],
            },
            {
                question: "Does the jury know who won before the Award Show?",
                answer: [
                    p("No."),
                    p("The final winner remains confidential until the Award Show."),
                ],
            },
            {
                question: "What happens if a jury member has a conflict of interest?",
                answer: [
                    p("If a jury member has a conflict of interest within a category, they are excluded from voting in that entire category."),
                    p("This means they cannot vote for their own case — or for any other case within that category."),
                ],
            },
            {
                question: "Can a company connected to a jury member still submit and win?",
                answer: [
                    p("Yes."),
                    p("Being connected to a jury member does not prevent an eligible company or case from participating."),
                    p("However, if this creates a conflict of interest, the respective jury member is excluded from the entire voting process for that category."),
                    p("The remaining eligible jurors determine the result independently."),
                ],
            },
        ],
    },
    {
        heading: "Sponsors & Independence",
        entries: [
            {
                question: "Can TCG Awards sponsors be nominated or submit cases?",
                answer: [
                    p("Yes."),
                    p("Sponsorship does not exclude a company or its products from participating in the Awards."),
                    p("A sponsor can submit a Brand Award case under the same process as any other company. A sponsor, product or brand may also be nominated for a Community Award if it meets the respective eligibility criteria."),
                ],
            },
            {
                question: "Do sponsors receive an advantage in the voting or judging process?",
                answer: [
                    p("No."),
                    p("Sponsorship has no influence on nominations, community votes, jury points, finalist selection or award results."),
                    p("Sponsors participate under the same rules as everyone else."),
                ],
            },
            {
                question: "Can a sponsor be part of the Brand Awards jury?",
                answer: [
                    p("No."),
                    p("TCG Awards sponsors cannot be members of the jury."),
                ],
            },
            {
                question: "Can sponsors influence the Community Awards?",
                answer: [
                    p("No."),
                    p("Community Awards are determined solely by eligible community nominations and votes. Sponsors receive no additional weighting or influence."),
                ],
            },
            {
                question: "Can sponsors influence the Brand Awards?",
                answer: [
                    p("No."),
                    p("Brand Awards are determined by the independent jury process. Sponsorship does not provide additional points, voting rights or any other advantage."),
                ],
            },
        ],
    },
    {
        heading: "In Short",
        entries: [
            {
                question: "Who actually decides who wins?",
                answer: [
                    p("It depends on the award:"),
                    ul(
                        "Community Awards → The Community decides.",
                        "Performance Awards → Competitive performance decides.",
                        "Brand Awards → The independent jury decides."
                    ),
                    p("Sponsorship has no influence on any of these three processes."),
                ],
            },
        ],
    },
];

function FaqBlock({ block }: { block: Block }) {
    if (block.type === "ul") {
        return (
            <ul className="faq-answer-list">
                {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        );
    }
    return <p className="faq-answer-text">{block.text}</p>;
}

function FaqItemComponent({ entry }: { entry: FaqEntry }) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    return (
        <div className={`faq-item ${open ? "faq-item-open" : ""}`}>
            <button
                type="button"
                className="faq-question clickable no-select"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
            >
                <span className="faq-question-text">{entry.question}</span>
                <svg
                    className="faq-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            <div id={panelId} className="faq-panel" role="region">
                <div className="faq-panel-inner">
                    <div className="faq-panel-content">
                        {entry.answer.map((block, i) => (
                            <FaqBlock key={i} block={block} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function FaqPage() {
    return (
        <div id="faq-page" className="default-page">
            <div className="faq-hero">
                <h1>FAQs</h1>
                <p>TCG Awards – Voting &amp; Judging</p>
            </div>

            <div className="faq-sections w-100 flex column gap-4">
                {FAQ_SECTIONS.map((section) => (
                    <section className="faq-section" key={section.heading}>
                        <h2 className="faq-section-heading">{section.heading}</h2>
                        <div className="faq-list">
                            {section.entries.map((entry) => (
                                <FaqItemComponent key={entry.question} entry={entry} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default FaqPage;
