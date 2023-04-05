// Next
import React from "react";
import { useRouter } from "next/router";

// Components
import { BsBoxArrowRight } from "react-icons/bs";
import PrimaryButton from "../Inputs/Buttons/PrimaryButton";

export default function PathwayHelp() {
    // Router
    const router = useRouter();

    // Event handlers
    const handleClick = () => {
        router.push("/");
    };

    return (
        <div className="
            w-full
            h-full
            flex
            justify-center
            items-center
        ">
            <div className="
                flex
                flex-col
                justify-center
                items-center
                [&>*]:mt-5
                text-center
                p-10
            ">
                <h1 className="
                    text-3xl
                ">
                    No pathway to display!
                </h1>
                <p className="
                    text-xl
                ">
                    Visit the home page to generate a pathway that will be displayed here
                </p>
                <PrimaryButton onClick={handleClick}>
                    Take me there <BsBoxArrowRight />
                </PrimaryButton>
            </div>
        </div>
    );
}
