import "./brandCasesInfo.page.css";
import VoteButtonComponent from "../components/voteButton.component";

function BrandCasesInfoPage() {
    return (
        <div id="brand-cases-info-page" className="default-page">
            <div className="w-100 flex column">
                <h1>Further Information for Brand Cases</h1>
                <p>Here you will find everything we will ask for to evaluate your Brand Case. You do not need to have everything ready to register your Brand Case. After registration, there will be a dedicated time window to hand everything in. Please read the step-by-step directions in the registration process:</p>
                <br />
                <div className="w-100 flex center items-center">
                    <VoteButtonComponent title={`Register your Brand Case`} onClick={() => window.open("https://wkf.ms/4tlCKOu", "_blank")} />
                </div>
                <br />


                <div className="flex column gap-1">
                    <h2>Category: Service Provider of the Year</h2>
                <p>The Service Provider of the Year award was designed to celebrate the platform, app,
                    or service that made life easier for players, stores, and organizers — advancing the
                    infrastructure of the TCG ecosystem
                </p>
                    <h3>Basic information</h3>
                <p>Please provide us with the basic information around your service, mainly the name of
the service, the platform, particiapting brands and organizations, and served markets
and regions.</p>
                <h3>Service Overview</h3>
                <p>Please describe the core functionality and key features of your service. Which
category are you active in (marketplace, pricing tool, grading service, logistics, etc.)?
Who is your target audience (players, retailers, publishers, collectors, etc.)? Which
problem does your service address and why is it important to solve?</p>
                <h3>Product and Execution</h3>
                <p>Please describe the key features and functionality you deliver. Are there any
integration with existing platforms or services? How scalable and reliable is your
service? What does your customer support or service model look like?</p>
                <h3>Adoption, Usage, and Impact Metrics</h3>
                <p>Can you please help us understand which metrics you measure and how you measure
success? How many people use your service? What is your and business impact?</p>
                <h3>Strategic Value</h3>
                <p>What is your product’s long-term impact on the TCG industry, game or ecosystem?
Did you implement any new technologies or innovation? What’s make your service
unique and how do you differentiate from existing competitors? Why will your service
be long-term relevant for the industry?</p>
                </div>
                

                <div className="line" />

                 <div className="flex column gap-1">
                    <h2>Category: Campaign of the Year</h2>


                <p>The Campaign of the Year award was designed to celebrate most outstanding
marketing campaign in the TCG industry combining strategy, storytelling, and
measurable impact.
                </p>
                    <h3>Basic information</h3>
                <p>Please provide us with the basic information around the campaign, mainly the name
of the campaign, participating brands and organizations, the duration and targeted
markets and regions.</p>
        <h3>Campaign Objectives</h3>
        <p>Please describe the objective of the campaign. Why did you launch it? What was
your desired objective (e.g. brand awareness, player acquisition, etc.) and which
target group did you try to reach? How did you segment your target group? What
was your core creative concept behind the campaign?</p>
        <h3>Campaign Execution</h3>
        <p>Which measures did you take to achieve your desired objectives? How did you
segment your target group? Which channels did you use for communication? Did you
use creator partnerships, event or retail activations? Which mediums did you use, e.g.
video and livestreaming?</p>
        <h3>Impact Metrics</h3>
        <p>Can you please help us understand which metrics you measured and how you
measured success? This can reach from business impact, like revenue, sales
terriroty expansion or market entries to hard metrics like total reach, particiaption,
engagement metrics. If you have any insight into media coverage or earned media
value, this will also help better understand the impact of the partnership.
</p>
          <h3>Strategic Value</h3>
          <p>What is the campaign’s long-term impact on your brand, game or ecosystem? How
does this campaign help to provide value to the TCG player and fan base? Did you
create any new standards or added innovative features to the industry?</p>
                </div>
          
           <div className="line" />

                  <div className="flex column gap-1">
                    <h2>Category: Brand Partnership of the Year</h2>


                <p>The Brand Partnership of the Year award was designed to celebrate the most
impactful collaboration between brands — recognizing partnerships that elevated
creativity, reach, and cultural relevance.
                </p>
                    <h3>Basic information</h3>
                    <p>Please provide us with the basic information around the partnership, mainly the name
of the partnership, participating brands and organizations, the duration and targeted
markets and regions.</p>
                <h3>Strategic Context</h3>
                <p>Please describe the strategic context of this partnership. What was its objective?
Which challenge or opportunity did the collaboration address? Why did it make
sense and who was it built for, who was the target audience?</p>
                 <h3>Partnership Structure</h3>
                 <p>What is the nature and scope of this partnership? For example, a licensing deal, co-
branding, distribution partnership, retail integration, event, creator collaboration, and
so on. Which role did each of the parties play in this partnership?</p>
                  <h3>Impact Metrics</h3>
                  <p>Can you please help us understand which metrics you measured and how you
measured success? This can reach from business impact, like revenue, sales
territory expansion or market entries to hard metrics like total reach, participation,
and engagement metrics. If you have any insight into media coverage or earned media
value, this will also help us better understand the impact of the partnership.</p>
                   <h3>Strategic Value</h3>
                   <p>What is the partnership’s long-term impact on your brands, game or ecosystem?
How does this partnership help to provide value to the TCG player and fan base?
Did you create any new standards or add innovative features to the industry?</p>
                </div>


 <div className="line" />

                    <h2>Evaluation Criteria</h2>
                    <p>Not all information listed in the submission form is mandatory. However, the award
will be evaluated by an independent expert jury with professional industry experience.
Providing clear context, supporting data, and measurable results will help the jury
better understand the scope and impact of your initiative and enable a fair and
informed evaluation. Submissions that include relevant metrics and supporting
information are therefore strongly encouraged. Our jury will sign an NDA to make sure
information provided will not be shared and only be used for the evaluation process.
You can optionally add any supporting materials you have to your submission, like a
partnership deck, video, links, visual assets, etc. To reduce workload on our jury, if
you do add materials, please make sure they are structured and make it easy to
extract relevant information.</p>
 <br />
 <p>If you have any questions, please contact: <a href="mailto:cases@tcg-awards.com">cases@tcg-awards.com</a></p>
            </div>

        </div>
    );
}

export default BrandCasesInfoPage;