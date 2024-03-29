import { Card, Text } from "@nextui-org/react";
import { useState } from "react";

interface CardProps {
  Title: string;
  Content: string;
}

export default function UmlCards({ CardProps }: { CardProps: CardProps[] }) {
    const [ClickedIndex, setClicked] = useState(-1);

    const CardClick = (index: number) => {
        if (ClickedIndex === index) {
            setClicked(-1);
        } else {
            setClicked(index);
        }
    };

    return (
        <div 
            className="
                flex 
                flex-wrap 
                justify-center 
                mx-4 
                lg:mx-16 
                xl:mx-24"
        >
            {CardProps.map((item: CardProps, index) => {
                const isClicked = ClickedIndex === index;
                return (
                    <div
                        key={index}
                        onClick={() => CardClick(index)}
                        className="
                            hover:scale-105
                            cursor-pointer
                            w-full 
                            md:w-1/2 
                            lg:w-1/3 
                            xl:w-1/4 
                            px-4 
                            py-2"
                    >
                        <Card
                            className={"transition-all duration-200 bg-light-gray"}
                            //needed for NEXT-IU to modified styling
                            css={{
                                justifyContent: "center",
                                alignItems: "center",
                                padding: ".5rem",
                                filter: "drop-shadow(0 0.2rem 0.2rem rgb(3 105 177))",
                                height: isClicked ? "auto" : "100px",
                            }}
                        >
                            <Text
                                b
                                className="text-center text-xl"
                            >
                                {item.Title}
                            </Text>
                            <Card.Body className={`${
                                isClicked ? "block" : "hidden"
                            }`}>
                                <Text>{item.Content}</Text>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}

