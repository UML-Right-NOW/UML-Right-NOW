import React, { useState, useRef, MutableRefObject } from "react";

// Types
export type AccordionItemType = {
    question: string;
    answer: string;
};

const AccordionItem = ({ question, answer }: AccordionItemType) => {
    const [show, setShow] = useState(false);
    const contentRef = useRef() as MutableRefObject<HTMLDivElement>;

    const toggleAccordion = () => {
        setShow((prev) => !prev);
    };

    const icon = show ? "-" : "+";

    return (
        <li className={"shadow-lg my-2"}>
            <button
                className="w-full h-14
                border
                border-gray-300
                rounded-md
                hover:border-rowdy-blue 
                focus:outline-none flex 
                items-center 
                justify-between 
                px-4 py-2"
                onClick={toggleAccordion}
            >
                <span>{question}</span>
                <span className="text-xl font-bold">{icon}</span>
            </button>
            <div
                ref={contentRef}
                className={`${
                    show ? "h-auto" : "h-0"
                } 
                overflow-hidden 
                transition-height 
                duration-300 
                ease-in-out`}
            >
                <div className="p-4">{answer}</div>
            </div>
        </li>
    );
};

function Accordion({ items }: { items: AccordionItemType[] }) {
    return (
        <ul 
            className="
                w-3/4  
                sm:w-1/2 
                mx-auto 
                text-center
                mt-4"
        >
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                />
            ))}
        </ul>
    );
}

export default Accordion;

