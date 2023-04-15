// Next
import React from "react";

// Components
import SemesterElement from "../PathwayTable/SemesterElement";

// Libraries
import DegreePathway from "@/DegreePathway";

// Types
type PathwayTableProps = {
    degreePathway: DegreePathway;
};

export default function PrintableTable({ degreePathway }: PathwayTableProps) {
    // Generate the JSX for the list of semesters
    const semesterElements = degreePathway.semesters.map(semester => {
        // Generate a unique key for the current semester
        const key = `${semester.name}-${semester.creditsAttempted}-${semester.creditsEarned}-${semester.courses.length}`;
        return <SemesterElement semester={semester} key={key} />;
    });

    return (
        <div className="
            justify-start
            items-center
            grid-cols-1
            gap-y-4
            flex-col
            "
        > 
            {semesterElements}
        </div>
    );
}
