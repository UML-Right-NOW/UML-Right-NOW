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

const PrintPathway: React.FC<PrintPathwayProps> = ({ degreePathway, major }) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isColumn,setColumn]= useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const handlePrint = useReactToPrint({
        
        onBeforeGetContent: async () => {
            // Wait for component to be updated before getting its content
            setIsLoading(true);
            setColumn(false);
            await new Promise((resolve) => setTimeout(resolve, 100));
            
        },
        content: () => componentRef.current,
        onAfterPrint: () =>{
            setColumn(true);
            setIsLoading(false);
            
        }
    });
    
    return (
        <div className="flex justify-center">
            {
                <PrimaryButton  classes="
                fixed 
                bottom-10
                "
                onClick={handlePrint}> {isLoading ? "Getting ready" : "Print Your Pathway"}
                </PrimaryButton>}
            <div
                ref={componentRef}>
                <PathwayTable degreePathway={degreePathway}  major={major} isColumn={isColumn}/>
            </div>
            
        </div>
    );
};

export default PrintPathway;
