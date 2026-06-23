import "./brandCasesInfo.page.css";
import VoteButtonComponent from "../components/voteButton.component";
import { useContent } from "../content/content.context";
import { BrandCategory } from "../content/content.types";

function CategoryCard({ category }: { category: BrandCategory }) {
    return (
        <div className="bci-category">
            <span className="bci-category-badge">{category.badge}</span>

            <p>{category.description}</p>

            <div className="bci-criteria">
                {category.steps.map((step, i) => (
                    <div className="bci-step" key={i}>
                        <div className="bci-step-line">
                            <div className="bci-step-dot" />
                            <div className="bci-step-connector" />
                        </div>
                        <div className="bci-step-content">
                            <h3>{step.label}</h3>
                            <p>{step.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BrandCasesInfoPage() {
    const { brandCasesInfo: c } = useContent();

    return (
        <div id="brand-cases-info-page" className="default-page">
            <div className="w-100 flex column">

                {/* Hero */}
                <div className="bci-hero">
                    <h1>{c.heroTitle}<br /><span>{c.heroSpan}</span></h1>
                    <p>{c.heroText}</p>
                </div>

                {/* CTA */}
                <div className="bci-cta-strip">
                    <p>{c.ctaText}</p>
                    <VoteButtonComponent
                        title={c.ctaButton.label}
                        onClick={() => c.ctaButton.href && window.open(c.ctaButton.href, "_blank")}
                    />
                </div>

                {/* Category Cards */}
                {c.categories.map((cat, i) => (
                    <CategoryCard key={i} category={cat} />
                ))}

                {/* Evaluation */}
                <div className="bci-evaluation">
                    <h2>{c.evaluationTitle}</h2>
                    <p>{c.evaluationText}</p>
                </div>

                {/* Contact */}
                <div className="bci-contact">
                    <span>{c.contactLabel}</span>
                    <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>
                </div>

            </div>
        </div>
    );
}

export default BrandCasesInfoPage;
