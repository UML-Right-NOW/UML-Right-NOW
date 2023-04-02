
import anderson from "../../assets/anderson.jpg";
import john from "../../assets/john.jpg";
import logo from "../../assets/logo.png";
import sam from "../../assets/sam.jpg";
import CardForAboutUs from "../components/ProfileCard/CardForAboutUs";

export default function AboutUs() {

    const aboutUsText = ["nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum",
        "Tell me and I forget. Teach me and I remember. Involve me and I learn.", "In a collaborative effort, four classmates recently embarked on a challenging project to develop a web application that could get an unofficial University of Massachusetts transcripts , and help students plan their academic journey from start to finish. The idea behind the project was to create a streamlined and user-friendly application that would allow UML students to easily access their academic records, review their progress, and plan their future coursework. To achieve this, the team employed a range of skills, including web development, data analysis, and user interface design. One of the key features of the application was its ability to take user input and generate a personalized degree pathway, based on their academic goals and preferences. This functionality was a significant challenge for the team, as it required the integration of complex algorithms and the processing of large amounts of data. Despite these challenges, the team worked tirelessly to bring the application to life, conducting extensive research and testing to ensure its accuracy and functionality. The final product was a polished and intuitive web application that received positive feedback from both classmates and professors. Overall, the success of this project was a testament to the teamwork, dedication, and technical expertise of the four classmates involved. By combining their skills and working collaboratively, they were able to create a valuable resource for UML students that streamlined academic planning and helped students achieve their goals."];
    return (
        <div className="h-auto ">
            <div className="bg-rowdy-blue text-white">
                <h1 className="text-center lg:text-left m-6">{aboutUsText.at(2)}</h1>
            </div>
            <div className="flex justify-center bg-rowdy-blue text-white mt-10">
                <h1 className="text-left m-6">Team Members</h1>
            </div>
            <CardForAboutUs name="Sam Claflin" linkedin="https://www.linkedin.com/in/SamClaflin/" email="samclaflin7@gmail.com" url={sam} quote={aboutUsText.at(0)} />
            <CardForAboutUs name="John E Youte" linkedin="https://www.linkedin.com/in/john-youte-2162391b8" email="johneyoute@gmail.com" url={john} quote={aboutUsText.at(1)} />
            <CardForAboutUs name="Anderson Torres" linkedin="https://www.linkedin.com/in/elnito/" email="ato.orte@gmail.com" url={anderson} quote={aboutUsText.at(0)} />
            <CardForAboutUs name="Dante Suarez" linkedin="https://www.linkedin.com/in/dante-suarez/" email="dante_suarez@student.uml.edu" url={logo} quote={aboutUsText.at(0)} />
        </div>
    );
}
