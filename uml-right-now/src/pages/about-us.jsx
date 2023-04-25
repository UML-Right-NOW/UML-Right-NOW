import anderson from "../../assets/anderson.jpg";
import john from "../../assets/john.jpg";
import logo from "../../assets/logo.png";
import sam from "../../assets/sam.jpg";
import CardForAboutUs from "../components/ProfileCard/CardForAboutUs";

// Constants
const aboutUsText = "In a collaborative effort, four classmates recently embarked on a challenging project to develop a web application that could get an unofficial University of Massachusetts transcripts , and help students plan their academic journey from start to finish. The idea behind the project was to create a streamlined and user-friendly application that would allow UML students to easily access their academic records, review their progress, and plan their future coursework. To achieve this, the team employed a range of skills, including web development, data analysis, and user interface design. One of the key features of the application was its ability to take user input and generate a personalized degree pathway, based on their academic goals and preferences. This functionality was a significant challenge for the team, as it required the integration of complex algorithms and the processing of large amounts of data. Despite these challenges, the team worked tirelessly to bring the application to life, conducting extensive research and testing to ensure its accuracy and functionality. The final product was a polished and intuitive web application that received positive feedback from both classmates and professors. Overall, the success of this project was a testament to the teamwork, dedication, and technical expertise of the four classmates involved. By combining their skills and working collaboratively, they were able to create a valuable resource for UML students that streamlined academic planning and helped students achieve their goals.";
const teamInfoArr = [
    { name: "Sam Claflin", linkedin: "https://www.linkedin.com/in/SamClaflin/", email: "samclaflin7@gmail.com", url: sam, quote: "Coming soon" },
    { name: "John E Youte", linkedin: "https://www.linkedin.com/in/john-youte-2162391b8", email: "johneyoute@gmail.com", url: john, quote: "Coming soon" },
    { name: "Anderson Torres", linkedin: "https://www.linkedin.com/in/elnito/", email: "ato.orte@gmail.com", url: anderson, quote: "Coming soon" },
    { name: "Dante Suarez", linkedin: "https://www.linkedin.com/in/dante-suarez/", email: "dante_suarez@student.uml.edu", url: logo, quote: "Coming soon" }
];

export default function AboutUs() {
    return (
        <main>
            {/* About Us Text Container */}
            <div className="
                my-10
                px-10
                py-5
                bg-rowdy-blue 
            ">
                {/* About Us Text */}
                <p className="
                    text-white 
                    text-center 
                ">
                    {aboutUsText}
                </p>
            </div>
            
            {/* Team Members Header Container */}
            <div className="
                w-full
                flex
                justify-center
                items-center
            ">
                {/* Team Members Header */}
                <h1 className="
                    text-xl
                    text-center
                    bg-light-gray
                    rounded-xl
                    px-10
                    py-5
                    text-rowdy-blue
                ">
                    Team Members
                </h1>
            </div>

            {/* Team Cards Container */}
            <div className="
                w-full
                flex
                flex-col
                justify-start
                items-center
                sm:grid
                sm:grid-cols-2
                sm:gap-5
                lg:grid-cols-3
                xl:grid-cols-4
            ">
                {teamInfoArr.map((x, index) => {
                    return (
                        <CardForAboutUs key={index} name={x.name} linkedin={x.linkedin} email={x.email} url={x.url} quote={x.quote} />
                    );
                })}
            </div>
        </main>
    );
}
