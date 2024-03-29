import CourseCode from "@/classes/CourseCode";
import DegreePathway from "@/classes/DegreePathway";
import SemesterElement from "./SemesterElement";
import { useState } from "react";

// Types
type PathwayTableProps = {
    degreePathway: DegreePathway;
    major: string | null;
    isColumn: boolean;
};

// Tailwind
const pathwayContainerClassBase = `
    w-full
    flex 
    flex-col 
    justify-start 
    items-center
`;
const pathwayContainerClassDefault = `
    ${pathwayContainerClassBase}
    xl:grid 
    xl:grid-cols-2 
    xl:gap-5 
    xl:items-start
`;
const pathwayContainerClassColumn = `
    ${pathwayContainerClassBase}
`;

export default function PathwayTable({ degreePathway, major, isColumn }: PathwayTableProps) {
    // State
    const [unused, setUnused] = useState(false);

    // Determine pathway container classes
    const pathwayContainerClass =  isColumn
        ? pathwayContainerClassColumn
        : pathwayContainerClassDefault;
        
    // Event handlers
    const handleDeleteCourse = (courseCode: CourseCode) => {
        degreePathway.removeCourse(courseCode);

        // Force update
        setUnused(!unused);
    };

    return (
        <div className={isColumn
            ? "w-full"
            : "w-11/12 sm:w-5/6 md:w-2/3"
        }> 
            {/* Major Header */}
            <h1 className="
                text-xl
                mb-10
                text-center
                px-5
                py-2
                bg-light-gray
                rounded-xl
                w-full
            ">
                Your generated pathway for:
                <br></br>
                <span className="text-rowdy-blue">{major}</span>
            </h1>

            {/* Pathway Table */}
            <div className={pathwayContainerClass}>
                {degreePathway.semesters.map((semester) => {
                    // Generate a unique key for the current semester
                    const key = `${semester.name}-${semester.creditsAttempted}-${semester.creditsEarned}-${semester.courses.length}`;
                    return (
                        <SemesterElement semester={semester} key={key} onCourseDelete={handleDeleteCourse} />
                    );
                })}
            </div>
        </div>
    );
}
