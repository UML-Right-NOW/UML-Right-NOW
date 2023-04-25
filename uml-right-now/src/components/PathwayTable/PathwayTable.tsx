import DegreePathway from "@/classes/DegreePathway";
import SemesterElement from "./SemesterElement";
import {useEffect, useState } from "react";
import CourseCode from "@/classes/CourseCode";

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
    const pathwayContainerClass =  isColumn
        ? pathwayContainerClassColumn
        : pathwayContainerClassDefault;
        
    const [pathway, setPathway] = useState(degreePathway);
    const [pathwayUpdated, setPathwayUpdated] = useState(false);
    function handleDeleteCourse(courseId: CourseCode) {
        const updatedPathway = pathway.removeCourse(courseId);
        setPathway(updatedPathway);
        
        setPathwayUpdated(true);
    }
    useEffect(() => {
        if (pathwayUpdated) {
            const timeoutId = setTimeout(() => {
                
                console.log(setPathwayUpdated(false));
            }, 500); // set timeout to 1/2 seconds
            return () => clearTimeout(timeoutId);
            
        }},[pathwayUpdated]);
      
    // Generate the JSX for the list of semesters
    const semesterElements = pathway.semesters.map((semester) => {
        // Generate a unique key for the current semester
        const key = `${semester.name}-${semester.creditsAttempted}-${semester.creditsEarned}-${semester.courses.length}`;
        return (
            <SemesterElement semester={semester} key={key} onCourseDelete={handleDeleteCourse} />
        );
    });
   
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
                {semesterElements}
                {pathwayUpdated}
            </div>
        </div>
    );
}
