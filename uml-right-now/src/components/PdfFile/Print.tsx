import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableTable from "./PrintableTable";
import DegreePathway from "@/DegreePathway";
import PrimaryButton from "@/components/Inputs/Buttons/PrimaryButton";
interface PrintPathwayProps {
  degreePathway: DegreePathway;
  major: string | null;
}

const PrintPathway: React.FC<PrintPathwayProps> = ({ degreePathway, major }) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isvisible, setIsvisible] = useState(true);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            setIsLoading(true);
            
        },

        onAfterPrint: () => {
            setIsLoading(false);
            setIsvisible(false);
         
        },

    });
    
    return (
        <div className="flex justify-center">
            {
                isvisible && <PrimaryButton  classes="
                fixed 
                bottom-4
                "
                onClick={handlePrint}> {isLoading  ? "Loading" : "Print Your Pathway"}
                </PrimaryButton>}
            <div
                ref={componentRef}
                className="
                w-full
                flex
                flex-col
                items-center
                justify-center
          ">
                <h1 className='
                text-xl
                mb-10
                text-center
                px-5
                py-2
                rounded-xl
              bg-light-gray              
                mx-5
                    '>
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
