import PrimaryButton from "@/components/Inputs/Buttons/PrimaryButton";
import TranscriptInput from "@/components/TranscriptInput/TranscriptInput";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsBoxArrowRight, BsRocketTakeoffFill, BsSafe2Fill } from "react-icons/bs";
import SearchBar from "../components/SearchBar/SearchBar";

// Contexts
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";

export default function Home() {
    const backgroundimage1 = "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    // Contexts
    const { setTranscript, setMajor } = useContext(TranscriptContext) as TranscriptContextType;

    // Initialize router
    const router = useRouter();
    const textSafe = [{ text: "Creating an account or logging in is essential to make the most of our website. You'll get access to features such as saving searches and preferences, personalized recommendations, and our comprehensive pathway generator. Sign up today and enjoy a seamless experience." }, { text: "Your data privacy and security are our top priority. We use robust encryption and adhere to data protection laws to keep your personal information confidential and secure." }];

    useEffect(() => {
        // Reset the transcript and major each time the home page is visited
        setTranscript(null);
        setMajor(null);
    }, [setTranscript, setMajor]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        router.push("/pathways");
    }

    // Event handlers
    const handleClick = () => {
        router.push("/sign-up");
    };

    return (
        <main>
            {/* Landing Section */}
            <div className="w-full backdrop-brightness-50 min-h-screen flex flex-col justify-start items-center bg-rowdy-blue bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundimage1})` }} >
                {/* Main Heading */}
                <h1 className="text-white text-center text-4xl sm:text-5xl md:text-6xl font-bold mt-10">UML Right NOW</h1>

                {/* Subheading */}
                <h2 className="text-center text-2xl sm:text-3xl md:text-4xl text-white mt-5 italic px-10">Your custom degree pathway is just a few clicks away!</h2>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="w-full mt-10 flex flex-col justify-center items-center p-10 bg-black border-white border-t-1 bg-opacity-20 mb-32">
                    {/* Search Bar */}
                    <h2 className="text-2xl font-sans text-center text-white">Enter your major to get started</h2>
                    <div className="mt-5 w-[275px] sm:w-[400px]">
                        <SearchBar />
                    </div>

                    {/* Transcript Input */}
                    <h3 className="text-2xl text-white mt-10">Optionally...</h3>
                    <div className="mt-5" >
                        <TranscriptInput />
                    </div>

                    {/* Submit Button */}
                    <PrimaryButton classes="mt-20" type="submit">
                        Generate <AiOutlineCheck />
                    </PrimaryButton>
                </form>
            </div>

            {/* Lower Section */}
            <div className="bg-light-blue h-3/6 p-6 flex flex-col justify-start items-center">
                {/* Subheading */}
                <h2 className="text-3xl font-bold text-center text-white">Join UML Right NOW</h2>

                {/* Grid */}
                <div className="grid grid-cols lg:grid-cols-2 justify-center p-5">
                    {/* First Grid Cell */}
                    <div className="border-white border-b-2 p-5 lg:border-r-2 lg:border-b-0">
                        <div className="flex justify-center m-4"><BsRocketTakeoffFill size={50} color="white" /></div>
                        <h1 className="text-center text-white font-bold lg:text-left">{textSafe[0].text}</h1>
                    </div>

                    {/* Second Grid Cell */}
                    <div className="p-5">
                        <div className="flex justify-center m-4"><BsSafe2Fill size={50} color="white" /></div>
                        <h1 className="text-white font-bold text-center lg:text-left">{textSafe[1].text}</h1>
                    </div>
                </div>

                {/* Sign Up Button */}
                <PrimaryButton classes="
                    !bg-white
                    !text-light-blue
                    !border-white
                    hover:!bg-transparent
                    hover:!text-white
                " onClick={handleClick}>
                    Sign up now <BsBoxArrowRight />
                </PrimaryButton>
            </div>
        </main>
    );
}
