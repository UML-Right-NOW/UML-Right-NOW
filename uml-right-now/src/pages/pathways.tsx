// Next
import React, { useContext } from "react";

// Contexts
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";

// Components
import PathwayTable from "@/components/PathwayTable/PathwayTable";
import DegreePathway from "@/DegreePathway";

export default function Pathways() {
    // Contexts
    const { transcript } = useContext(TranscriptContext) as TranscriptContextType;
    
    // Retrieve the transcript if applicable
    let degreePathway: null | DegreePathway = null;
    if (transcript) {
        degreePathway = new DegreePathway(transcript.semesters);
    }

    return (
        <div className="
            flex
            flex-col
            justify-start
            items-center
            py-10
        ">
            {degreePathway && <PathwayTable degreePathway={degreePathway} />} 
        </div>        
    );
}
