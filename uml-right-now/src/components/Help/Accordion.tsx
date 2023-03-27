import React, { useState, useRef, MutableRefObject }from "react";
import { FAQ } from "../../../lib/Help_text";

// Types
type AccordionItemType = {
    data: {
        question: string,
        answer: string
    }
};

const AccordionItem = ({ data }: AccordionItemType) => {

    const [show, setshow] = useState(false);
    const contentReference = useRef() as MutableRefObject<HTMLDivElement>;
  
    const { question, answer } = data;
  
    const Toggle = () => {
        setshow((prev) => !prev);
    };
    const Left ={
        left: "97%"
    };
    const MyMargin={
        margin:"2% auto auto auto"
    };
    return (
        <li className={` ${show ? "active" : ""} shadow-sm`}>
            <button className=" 
            hover:border-[#0369B1]	hover:border-x-4
            w-11/12
            h-14
            border
            flex
            items-center
            px-10
            justify-center
            rounded-md
            hover:scale-105
            drop-shadow-xl
            "  style={MyMargin}
            onClick={Toggle}>
                {question}
                <span className="absolute " style={Left}>{show ? "—" : "+"} </span>
            </button>
  
            <div
                ref={contentReference}
                className="h-0 overflow-hidden	ease-in	"
                style={
                    show
                        ? { height: contentReference.current.scrollHeight }
                        : { height: "0px" }
                }
            >
                <div className="p-5  w-11/12
            flex
            items-center
            m-auto
            justify-center
            shawdow-lg 
            hover:scale-105
            ">{answer}</div>
            </div>
        </li>
    );
};
  
const Accordion = () => {
    return (
        <ul >
            {FAQ.map((data, index) => (
                <AccordionItem key={index} data={data} />
            ))}
        </ul>
    );
};

export default Accordion;

  
  