import CourseCode from "@/classes/CourseCode";

// Types
type CourseElementProps = {
    courseCode: CourseCode,
    courseName: string,
    courseCredits: number | string
    onCourseDelete: (courseCode: CourseCode) => void;
};

export default function CourseElement({ courseCode, courseName, courseCredits, onCourseDelete }: CourseElementProps) {
    function handleDeleteClick() {
        onCourseDelete(courseCode);
    }
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
            <td><button onClick={handleDeleteClick}>Delete</button>
                
            </td>
        </tr>
    );
}
