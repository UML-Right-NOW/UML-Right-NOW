import Semester from "@/classes/Semester";
import { useEffect, useState } from "react";
import CourseElement from "./CourseElement";
import CourseCode from "@/classes/CourseCode";

// Types
type SemesterElementProps = {
    semester: Semester;
    onCourseDelete: (courseCode: CourseCode) => void;
};

export default function SemesterElement({ semester, onCourseDelete }: SemesterElementProps) {
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

    // Remove a course from the semester
    const removeCourse = (courseCode: CourseCode) => {
        onCourseDelete(courseCode);
    };
 
    // Generate the JSX for the list of courses
    const courseElements = semester.courses.map((course, index) => {
        // Generate a unique key for the current course  
        const key = `${new Date().getTime() / 1000}-${course.code}-${course.name}-${course.creditsAttempted}-${course.creditsEarned}-${index}`;

        return (
            <CourseElement 
                courseCode={course.code} 
                courseName={course.name} 
                courseCredits={course.creditsAttempted} 
                key={key}
                onCourseDelete={() => removeCourse(course.code)}
            />
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
                    <tr className="
                        text-xs
                        [&>td]:p-2
                        bg-neutral-200
                        sm:text-sm
                        sm:[&>td]:p-4
                    ">
                        <td>Course Code</td>
                        <td className="
                            text-center
                        ">Course Name</td>
                        <td className="
                            text-right
                        ">Course Credits</td>
                        <td>Actions</td>
                    </tr>

                    {/* Semester Courses */}
                    {courseElements}
                </tbody>
            </table>
        </div>
    );
}
 