import CourseCode from "@/classes/CourseCode";

// Types
type CourseElementProps = {
    courseCode: CourseCode,
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
            <td>{courseCode.value}</td>
            <td className="
                text-center
            ">{courseName}</td>
            <td className="
                text-right
            ">{courseCredits}</td>
            <td/>
        </tr>
    );
}
