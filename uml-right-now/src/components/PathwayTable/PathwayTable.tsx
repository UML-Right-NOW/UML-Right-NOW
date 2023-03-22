// Next
import React from "react";

// Components
import SemesterElement from "./SemesterElement";

// Libraries
import DegreePathway from "@/DegreePathway";

// Types
type PathwayTableProps = {
    degreePathway: DegreePathway;
};

export default function PathwayTable({ degreePathway }: PathwayTableProps) {
    // Generate the JSX for the list of semesters
    const semesterElements = degreePathway.semesters.map(semester => {
        // Generate a unique key for the current semester
        const key = `${semester.name}-${semester.creditsAttempted}-${semester.creditsEarned}-${semester.courses.length}`;
        return <SemesterElement semester={semester} key={key} />;
    });

    return (
        <div className="
            flex
            flex-col
            justify-start
            items-center
            w-11/12
            sm:w-5/6
            md:w-2/3
            lg:w-1/2
        ">
            {semesterElements}
        </div>
    );
}
