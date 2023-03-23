import TranscriptInput from "@/components/TranscriptInput/TranscriptInput";
import { Tooltip } from "@nextui-org/react";
import Head from "next/head";
import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";

export default function Home() {
    const backgroundimage1 = "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const [entry, setEntry] = useState("");

    function handleInput() {

    }

    return (
        <>
            <Head>
                <title>UML Right NOW</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="bg-rowdy-blue w-full backdrop-brightness-50 h-screen flex bg-rowdy-blue bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundimage1})` }} >
                    <div className="absolute w-full h-full">
                        <h1 className="md:text-4xl lg:text-9xl xl:text-7xl font-sans mt-20 text-center text-white mb-9">Enter Your <em className="xl:text-9xl text-rowdy-blue underline">major</em>  to get started</h1>
                        <div className=" flex justify-center mt-px" >
                            <SearchBar />
                        </div>
                        <div className=" flex justify-center" >
                            <h1 className="text-9xl text-white">-or-</h1>
                        </div>
                        <div className=" flex justify-center" >
                            <Tooltip content={"Upload Your UML transcript so we can help you better with your degree path"} color="primary" placement="rightEnd">
                                <TranscriptInput />
                            </Tooltip>

                        </div>
                        <div className=" flex justify-center" >

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


