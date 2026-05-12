import "./brandCasesInfo.page.css";
import VoteButtonComponent from "../components/voteButton.component";

interface Step {
    label: string;
    text: string;
}

interface Category {
    num: string;
    badge: string;
    title: string;
    description: string;
    steps: Step[];
}

const categories: Category[] = [
    {
        num: "01",
        badge: "Service Provider of the Year",
        title: "Service Provider of the Year",
        description:
            "The Service Provider of the Year award was designed to celebrate the platform, app, or service that made life easier for players, stores, and organizers — advancing the infrastructure of the TCG ecosystem.",
        steps: [
            {
                label: "Basic Information",
                text: "Please provide us with the basic information around your service, mainly the name of the service, the platform, participating brands and organizations, and served markets and regions.",
            },
            {
                label: "Service Overview",
                text: "Please describe the core functionality and key features of your service. Which category are you active in (marketplace, pricing tool, grading service, logistics, etc.)? Who is your target audience (players, retailers, publishers, collectors, etc.)? Which problem does your service address and why is it important to solve?",
            },
            {
                label: "Product and Execution",
                text: "Please describe the key features and functionality you deliver. Are there any integrations with existing platforms or services? How scalable and reliable is your service? What does your customer support or service model look like?",
            },
            {
                label: "Adoption, Usage, and Impact Metrics",
                text: "Can you please help us understand which metrics you measure and how you measure success? How many people use your service? What is your business impact?",
            },
            {
                label: "Strategic Value",
                text: "What is your product's long-term impact on the TCG industry, game or ecosystem? Did you implement any new technologies or innovation? What makes your service unique and how do you differentiate from existing competitors? Why will your service be long-term relevant for the industry?",
            },
        ],
    },
    {
        num: "02",
        badge: "Campaign of the Year",
        title: "Campaign of the Year",
        description:
            "The Campaign of the Year award was designed to celebrate the most outstanding marketing campaign in the TCG industry combining strategy, storytelling, and measurable impact.",
        steps: [
            {
                label: "Basic Information",
                text: "Please provide us with the basic information around the campaign, mainly the name of the campaign, participating brands and organizations, the duration and targeted markets and regions.",
            },
            {
                label: "Campaign Objectives",
                text: "Please describe the objective of the campaign. Why did you launch it? What was your desired objective (e.g. brand awareness, player acquisition, etc.) and which target group did you try to reach? How did you segment your target group? What was your core creative concept behind the campaign?",
            },
            {
                label: "Campaign Execution",
                text: "Which measures did you take to achieve your desired objectives? Which channels did you use for communication? Did you use creator partnerships, event or retail activations? Which mediums did you use, e.g. video and livestreaming?",
            },
            {
                label: "Impact Metrics",
                text: "Can you please help us understand which metrics you measured and how you measured success? This can reach from business impact, like revenue, sales territory expansion or market entries to hard metrics like total reach, participation, and engagement metrics. If you have any insight into media coverage or earned media value, this will also help better understand the impact of the partnership.",
            },
            {
                label: "Strategic Value",
                text: "What is the campaign's long-term impact on your brand, game or ecosystem? How does this campaign help to provide value to the TCG player and fan base? Did you create any new standards or add innovative features to the industry?",
            },
        ],
    },
    {
        num: "03",
        badge: "Brand Partnership of the Year",
        title: "Brand Partnership of the Year",
        description:
            "The Brand Partnership of the Year award was designed to celebrate the most impactful collaboration between brands — recognizing partnerships that elevated creativity, reach, and cultural relevance.",
        steps: [
            {
                label: "Basic Information",
                text: "Please provide us with the basic information around the partnership, mainly the name of the partnership, participating brands and organizations, the duration and targeted markets and regions.",
            },
            {
                label: "Strategic Context",
                text: "Please describe the strategic context of this partnership. What was its objective? Which challenge or opportunity did the collaboration address? Why did it make sense and who was it built for — who was the target audience?",
            },
            {
                label: "Partnership Structure",
                text: "What is the nature and scope of this partnership? For example, a licensing deal, co-branding, distribution partnership, retail integration, event, creator collaboration, and so on. Which role did each of the parties play in this partnership?",
            },
            {
                label: "Impact Metrics",
                text: "Can you please help us understand which metrics you measured and how you measured success? This can reach from business impact, like revenue, sales territory expansion or market entries to hard metrics like total reach, participation, and engagement metrics. If you have any insight into media coverage or earned media value, this will also help us better understand the impact of the partnership.",
            },
            {
                label: "Strategic Value",
                text: "What is the partnership's long-term impact on your brands, game or ecosystem? How does this partnership help to provide value to the TCG player and fan base? Did you create any new standards or add innovative features to the industry?",
            },
        ],
    },
];

function CategoryCard({ category }: { category: Category }) {
    return (
        <div className="bci-category">
            {/*    <span className="bci-category-num">{category.num}</span> */}
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
    return (
        <div id="brand-cases-info-page" className="default-page">
            <div className="w-100 flex column">

                {/* Hero */}
                <div className="bci-hero">
                    <h1>Further Information for<br /><span>Brand Cases</span></h1>
                    <p>
                        Here you will find everything we will ask for to evaluate your Brand Case.
                        You do not need to have everything ready to register. After registration,
                        there will be a dedicated time window to hand everything in.
                    </p>
                </div>

                {/* CTA */}
                <div className="bci-cta-strip">
                    <p>Ready to submit? Follow the step-by-step directions in the registration process.</p>
                    <VoteButtonComponent
                        title="Register your Brand Case"
                        onClick={() => window.open("https://wkf.ms/4tlCKOu", "_blank")}
                    />
                </div>

                {/* Category Cards */}
                {categories.map((cat, i) => (
                    <CategoryCard key={i} category={cat} />
                ))}

                {/* Evaluation */}
                <div className="bci-evaluation">
                    <h2>Evaluation Criteria</h2>
                    <p>
                        Not all information listed in the submission form is mandatory. However, the award
                        will be evaluated by an independent expert jury with professional industry experience.
                        Providing clear context, supporting data, and measurable results will help the jury
                        better understand the scope and impact of your initiative and enable a fair and
                        informed evaluation. Submissions that include relevant metrics and supporting
                        information are therefore strongly encouraged. Our jury will sign an NDA to make sure
                        information provided will not be shared and only be used for the evaluation process.
                        You can optionally add any supporting materials you have to your submission, like a
                        partnership deck, video, links, visual assets, etc. To reduce workload on our jury,
                        if you do add materials, please make sure they are structured and make it easy to
                        extract relevant information.
                    </p>
                </div>

                {/* Contact */}
                <div className="bci-contact">
                    <span>Questions?</span>
                    <a href="mailto:cases@tcg-awards.com">cases@tcg-awards.com</a>
                </div>

            </div>
        </div>
    );
}

export default BrandCasesInfoPage;