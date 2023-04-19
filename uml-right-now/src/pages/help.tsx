import Accordion from "@/components/Accordion/Accordion";
import UmlCards from "@/components/Card/Card";
import Carousel from "@/components/Carousel/carousel";

{/*Frequent asked Questions*/}
const FAQ = [
    {question: "Which is the current version?", answer: "Version 0.1"},
    {question: "Do you use transfer credits to get the pathway?", answer: "At the moment we do at a basic level"},
    {question: "How my data is stored?", answer: ""}
];

{/*Information for the cards */}
const HelpCards = [
    { Title: "Overview", Content: "UML Right NOW aims to be an improved, fully-automated version of the UML NOW Schedule Builder. With this web app, students are able to generate entire degree pathways in just a few clicks. By selecting a major offered by UML and optionally uploading an unofficial UML transcript, UML Right NOW will determine what course requirements have yet to be satisfied and sort these courses into one or more semesters. This renders not only Schedule Builder, but the need for academic advising appointments, obsolete. Additionally, students can create an account to save their generated degree pathways for convenient viewing in the future." },
    { Title: "Generating Degree Pathways", Content: "There is two ways to generate a Pathway: 1) Simply select/type your major and hit generate and you will get a pathway (sign up required for tailored Pathways). 2) Additionally, from selecting a mayor you can upload your transcript and a new pathway with the remaining classes that you will need to Graduate is generated. (More ways coming soon)" },
    { Title: "Accessing Reports", Content: "Reports are available for signed up user and they will be on your profile page. Additionally, there is the ability of downloading a PDF version of your Pathway.(Coming soon)" },
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

{/* constance for creation of labels */}
const Labels = `
w-1/3 
m-auto
mt-28
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
            <main>
                <UmlCards  CardProps={HelpCards}/>
                
                <h1 className={Labels}>
                    Find your Transcript
                </h1>
                <br/>
                <div className="w-3/4  sm:w-1/2 m-auto hover:scale-105"
                    style={{filter: "drop-shadow(0 0.2rem 0.2rem rgb(3 105 177))"}}>
                    <Carousel images={Images}/>
                </div>
                <h1 className={Labels}>
                   Frequently Asked Questions
                </h1> 
                <Accordion items={FAQ} />
            </main>
        </>
    );
}

