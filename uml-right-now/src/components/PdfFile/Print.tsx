import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PathwayTable from "@/components/PathwayTable/PathwayTable";
import DegreePathway from "@/DegreePathway";
import PrimaryButton from "@/components/Inputs/Buttons/PrimaryButton";
interface PrintPathwayProps {
    degreePathway: DegreePathway;
    major: string | null;
    isColumn?: boolean;
}

const PrintPathway: React.FC<PrintPathwayProps> = ({ degreePathway, major, isColumn }) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        
        onBeforeGetContent: () => {
            isColumn = ! isColumn;

        },
        content: () => componentRef.current,
        onAfterPrint: () =>{
            isColumn = ! isColumn;
            
        }
    });
    
    return (
        <div className="flex justify-center">
            {
                <PrimaryButton  classes="
                fixed 
                bottom-10
                "
                onClick={handlePrint}> Print Your Pathway
                </PrimaryButton>}
            <div
                ref={componentRef}>
                <PathwayTable degreePathway={degreePathway}  major={major} isColumn={isColumn}/>
            </div>
            
        </div>
    );
};

export default PrintPathway;
