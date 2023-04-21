import Accordion from "@/components/Accordion/Accordion";
import UmlCards from "@/components/Card/Card";
import Carousel from "@/components/Carousel/carousel";

{/*Frequent asked Questions*/}
const FAQ = [
    {question: "What is the current version?", answer: "0.1.1"},
    {question: "Do generated pathways account for transfer credits?", answer: "Yes, transfer credits are accounted for!"},
    {question: "Where do I find my transcript?", answer: "Please see the \"Find Your Transcript\" section of this page."},
];
{/*Information for the cards */}
const HelpCards = [
    { Title: "Overview", Content: "UML Right NOW aims to be an improved, fully-automated version of the UML NOW Schedule Builder. With this web app, students are able to generate entire degree pathways in just a few clicks. By selecting a major offered by UML and optionally uploading an unofficial UML transcript, UML Right NOW will determine what course requirements have yet to be satisfied and sort these courses into one or more semesters. This renders not only Schedule Builder, but the need for academic advising appointments, obsolete. Additionally, students can create an account to save their generated degree pathways for convenient viewing in the future." },
    { Title: "Generating Degree Pathways", Content: "There is two ways to generate a Pathway: 1) Simply select/type your major and hit generate and you will get a pathway (sign up required for tailored Pathways). 2) Additionally, from selecting a mayor you can upload your transcript and a new pathway with the remaining classes that you will need to Graduate is generated." },
    { Title: "Accessing Reports", Content: "Reports are available for signed up user and they will be on their profile page. Additionally, there is the ability of downloading a PDF version of your Pathway." },
];

{/*Images for the carousel*/}
const Images = [
    "/HelpImages/SisURL.png",
    "/HelpImages/findSSL.png",
    "/HelpImages/choose lowell.png",
    "/HelpImages/Sign in.png",
    "/HelpImages/click academics.png",
    "/HelpImages/view click.png",
    "/HelpImages/GenerateTranscript.png",
    "/HelpImages/view transcript.png"
];

{/* constant for creation of labels */}
const Labels = `
w-3/4  
sm:w-1/2
m-auto
mt-16
text-xl
text-center
font-semibold	
px-5
py-2
bg-light-gray
rounded-xl`;

export default function Help() {
    
    return (
        <>
            <main className="mt-10 mb-10">
                <UmlCards  CardProps={HelpCards}/>
                <h1 className={Labels}>
                    Find Your Transcript
                </h1>
                <div className="
                    w-3/4  
                    sm:w-1/2 
                    mx-auto 
                    mt-10
                    drop-shadow-lg
                    "
                >
                    <Carousel images={Images}/>
                </div>
                <h1 className={Labels}>
                   Frequently Asked Questions 
                </h1> 
                <Accordion items={FAQ} />
                <div className={`
                ${Labels} 
                mb-10
                border-2
                border-rowdy-red
                `}> <a  href="https://forms.gle/eFea9NGwqWC7uDoq7">Have a question?</a></div>
            </main>
            
        </>
    );
}

