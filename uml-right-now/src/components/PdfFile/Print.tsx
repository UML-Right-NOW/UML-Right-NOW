import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableTable from "./PrintableTable";
import DegreePathway from "@/DegreePathway";

interface PrintPathwayProps {
  degreePathway: DegreePathway;
  major: string | null;
}

const PrintPathway: React.FC<PrintPathwayProps> = ({ degreePathway, major }) => {
    const componentRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(false);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            setIsLoading(true);
        },

        onAfterPrint: () => {
            setIsLoading(false);
            
        },

    });
    return (
        <div className="flex flex-wrap justify-center">
            <button  className="
            fixed
            top-44
            right-0
            bg-rowdy-blue
            text-white 
            text-lg 
            text-center
            sm:px-3 sm:py-1
            md:px-2 md:py-1
            lg:px-6 lg:py-3
            rounded-full 
            flex 
            justify-center
            items-center
            border-2
             border-rowdy-blue
            [&>*]:ml-2
            hover:bg-white
            hover:text-rowdy-blue
            duration-[0.2s]" onClick={handlePrint}> {isLoading ? "Loading" : "Print Your Pathway"}
            </button>
            <div
                ref={componentRef}
                className="
                    w-full
                    flex
                    flex-col
                    items-center
                    justify-center
                 
          ">
                <h1 className="
                      text-xl
                      mb-10
                      text-center
                      px-5
                      py-2
                  bg-light-gray
              rounded-xl
                        mx-5
                    ">
                        Your generated pathway for:
                    <br></br>
                    <span className="
                            text-rowdy-blue
                        ">{major}</span>
                </h1>
                <PrintableTable degreePathway={degreePathway} />
            </div>
            
        </div>
    );
};

export default PrintPathway;
