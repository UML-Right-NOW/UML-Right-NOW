// Next
import React from "react";

// Components
import { BsBoxArrowRight } from "react-icons/bs";

export default function PathwayHelp() {
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
                <a className="
                    bg-rowdy-blue
                    text-white
                    w-44
                    px-5
                    py-2
                    rounded-md
                    flex
                    justify-between
                    items-center
                    duration-[0.1s]
                    border-2
                    border-rowdy-blue
                    hover:bg-white
                    hover:text-rowdy-blue
                " href="/">
                    Take me there <BsBoxArrowRight />
                </a>
            </div>
        </div>

    );
}
