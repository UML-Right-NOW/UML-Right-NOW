import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function Carousel({ images }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const Next = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const Prev = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    return (
        <div className="relative">
            <Image src={images[currentIndex]}  
                width={1080} 
                height={920} 
                className="object-cover w-full" 
                alt="Get Your Transcript" />
                
            <div className="absolute 
                            inset-0 
                            flex 
                            items-center 
                            justify-center"
            >
                <button onClick={Prev} className="absolute 
                                                        left-0 
                                                        top-1/2 
                                                        transform 
                                                        -translate-y-1/2 
                                                        bg-gray-900 
                                                        bg-opacity-50 
                                                        hover:bg-opacity-75 
                                                        py-2 
                                                        px-4 
                                                        rounded-e-full">
                    {/* < from w3 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={4}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg></button>
                <button onClick={Next} className="absolute 
                                                        right-0 
                                                        top-1/2 
                                                        transform 
                                                        -translate-y-1/2
                                                        bg-gray-900 
                                                        bg-opacity-50
                                                        hover:bg-opacity-75 
                                                        py-2 
                                                        px-4
                                                        rounded-s-full">
                    {/* > from w3 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={4}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>  
                </button>
            </div>
        </div>
    );
}
