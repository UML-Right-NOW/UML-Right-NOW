// Next
import { useContext } from "react";

// Contexts
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";

// Components
import PathwayTable from "@/components/PathwayTable/PathwayTable";

// Libraries
import DegreePathway from "@/DegreePathway";
import PathwayGenerator from "@/PathwayGenerator";

export default function Pathways() {
    // Contexts
    const { transcript } = useContext(TranscriptContext) as TranscriptContextType;

    // Compute the degree pathway if applicable
    let degreePathway: DegreePathway | null = null;
    const major = "Computer science general";   // TODO: Retrieve the major programatically
    if (major) {
        degreePathway = PathwayGenerator.generateDegreePathway("Computer science general", transcript);
    }

    return (
        <div className="
            flex
            flex-col
            justify-start
            items-center
            h-screen
            py-10
        ">
            {degreePathway && <PathwayTable degreePathway={degreePathway} />}
        </div>
    );
}
