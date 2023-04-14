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
        grid
        grid-cols-1
        justify-center
        items-center
        gap-y-4
        max-w-5xl
        mx-auto
        ">
            {semesterElements}
        </div>
    );
}
