// Next
import React, { useState, useEffect } from "react";

// Components
import CourseElement from "./CourseElement";

// Libraries
import Semester from "@/Semester";

// Types
type SemesterElementProps = {
    semester: Semester;
};

export default function SemesterElement({ semester }: SemesterElementProps) {
    // State
    const [didMount, setDidMount] = useState(false);
    
    // Initialization
    useEffect(() => {
        setDidMount(true);
    }, []);

    // NEXT.JS WEIRDNESS: Prevent "hydration" errors
    if (!didMount) {
        return null;
    }

    // Generate the JSX for the list of courses
    const courseElements = semester.courses.map((course, index) => {
        // Generate a unique key for the current course
        const key = `${new Date().getTime() / 1000}-${course.code}-${course.name}-${course.creditsAttempted}-${course.creditsEarned}-${index}`;

        return (
            <CourseElement 
                courseCode={course.code} 
                courseName={course.name} 
                courseCredits={course.creditsAttempted} 
                key={key} />
        );
    });

    return (
        <div className="
            bg-light-gray
            mb-5 
            w-full
            flex
            flex-col
            justify-start
            items-center
            rounded-2xl
            p-5
        ">
            {/* Semester Name */}
            <p className="
                text-xl
                font-bold
                mb-3
                capitalize
            ">{semester.name}</p>

            {/* Main Table */}
            <table className="
                w-full
                uppercase
            ">
                <tbody>
                    {/* Table Header */}
                    <CourseElement 
                        courseCode="Course Code"
                        courseName="Course Name"
                        courseCredits="Course Credits" />

                    {/* Semester Courses */}
                    {courseElements}
                </tbody>
            </table>
        </div>
    );
}
