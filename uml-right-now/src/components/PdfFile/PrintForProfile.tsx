import DegreePathway from "@/classes/DegreePathway";
import PrimaryButton from "@/components/Inputs/Buttons/PrimaryButton";
import PathwayTable from "@/components/PathwayTable/PathwayTable";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

// Types
interface PrintPathwayProps {
    degreePathway: DegreePathway;
    major: string | null;
    isColumn?: boolean;
}

const PrintPathway: React.FC<PrintPathwayProps> = ({ degreePathway, major }) => {
    // Refs
    const componentRef = useRef<HTMLDivElement>(null);

    // State
    const [isColumn, setColumn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Event handlers
    const handlePrint = useReactToPrint({
        onBeforeGetContent: async () => {
            // Wait for component to be updated before getting its content
            setIsLoading(true);
            setColumn(true);
            await new Promise((resolve) => setTimeout(resolve, 100));
        },
        content: () => componentRef.current,
        onAfterPrint: () => {
            setColumn(false);
            setIsLoading(false);
        }
    });

    return (
        <>


            {/* Pathway Table */}
            <div ref={componentRef} className="
                w-full
                flex
                flex-col
                justify-start
                items-center
            ">
                <PathwayTable degreePathway={degreePathway} major={major} isColumn />

                {/* Print Button */}
                <PrimaryButton classes=" fixed bottom-0 shadow-2xl"
                    onClick={handlePrint}> {isLoading ? "Getting ready" : "Print Your Pathway"}
                </PrimaryButton>
            </div>
        </>
    );
};

export default PrintPathway;
