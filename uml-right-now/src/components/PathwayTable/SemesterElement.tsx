import CourseCode from "@/classes/CourseCode";
import Semester from "@/classes/Semester";
import { useEffect, useState } from "react";
// Types
type SemesterElementProps = {
    semester: Semester,
    onDeleteCourse: (courseId: CourseCode) => void;
};

export default function SemesterElement({ semester,onDeleteCourse }: SemesterElementProps) {
    // State
    const [didMount, setDidMount] = useState(false);
    
    // Initialization
    useEffect(() => {
        setDidMount(true);
    }, []);

    // Remove a course from the semester
    onDeleteCourse = (courseCode: CourseCode) => {
        semester.courses = semester.courses.filter(course => !course.code.equals(courseCode));
    };

    // NEXT.JS WEIRDNESS: Prevent "hydration" errors
    if (!didMount) {
        return null;
    }

    // Generate the JSX for the list of courses
    const courseElements = semester.courses.map((course, index) => {
        // Generate a unique key for the current course
        const key = `${new Date().getTime() / 1000}-${course.code}-${course.name}-${course.creditsAttempted}-${course.creditsEarned}-${index}`;

        return (
            <tr key={key} className="
                text-xs
                [&>td]:p-2
                even:bg-neutral-400
                odd:bg-neutral-300
                sm:text-sm
                sm:[&>td]:p-4
            ">
                <td>{course.code.value}</td>
                <td className="
                    text-center
                ">{course.name}</td>
                <td className="
                    text-right
                ">{course.creditsAttempted}</td>
                <td className="
                    text-right
                ">
                    <button 
                        className="text-green-500"
                        onClick={() => onDeleteCourse(course.code)}
                    >
                        Completed
                    </button>
                </td>
            </tr>
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
                        <td></td>
                    </tr>

                    {/* Semester Courses */}
                    {courseElements}
                </tbody>
            </table>
        </div>
    );
}
 