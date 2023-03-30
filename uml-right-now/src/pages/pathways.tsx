// Next
import React, { useContext, useState, useEffect } from "react";

// Contexts
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";

// Components
import PathwayTable from "@/components/PathwayTable/PathwayTable";

// Libraries
import PathwayGenerator from "@/PathwayGenerator";
import DegreePathway from "@/DegreePathway";

export default function Pathways() {
    // Contexts
    const { transcript, major } = useContext(TranscriptContext) as TranscriptContextType;
    const [degreePathway, setDegreePathway] = useState<DegreePathway | null>(null);

    useEffect(() => {
        // Compute the degree pathway if applicable
        if (major) {
            PathwayGenerator.generateDegreePathway(major, transcript).then(pathway => {
                setDegreePathway(pathway);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [transcript, major]);

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
