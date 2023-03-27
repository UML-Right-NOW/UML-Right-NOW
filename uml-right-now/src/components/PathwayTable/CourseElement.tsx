// Next
import React from "react";

// Types
type CourseElementProps = {
    courseCode: string,
    courseName: string,
    courseCredits: number | string
};

export default function CourseElement({ courseCode, courseName, courseCredits }: CourseElementProps) {
    return (
        <tr className="
            text-xs
            [&>td]:p-2
            even:bg-neutral-400
            odd:bg-neutral-300
            sm:text-sm
            sm:[&>td]:p-4
        ">
            <td>{courseCode}</td>
            <td className="
                text-center
            ">{courseName}</td>
            <td className="
                text-right
            ">{courseCredits}</td>
        </tr>
    );
}
