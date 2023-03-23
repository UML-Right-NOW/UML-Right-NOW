// Next
import React, { useContext } from "react";

// Contexts
import { StudentInfoContext, StudentInfoContextType } from "@/contexts/StudentInfoContext";

// Components
import PathwayTable from "@/components/PathwayTable/PathwayTable";

// Libraries
import DegreePathway from "@/DegreePathway";

export default function Pathways() {
    // Contexts
    const { studentInfo } = useContext(StudentInfoContext) as StudentInfoContextType;
    
    // Render the degree pathway if applicable
    let degreePathway: null | DegreePathway = null;
    if (studentInfo) {
        degreePathway = new DegreePathway(studentInfo.semesters);
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
