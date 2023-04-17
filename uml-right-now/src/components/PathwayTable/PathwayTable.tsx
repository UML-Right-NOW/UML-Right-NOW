import DegreePathway from "@/DegreePathway";
import SemesterElement from "./SemesterElement";

// Types
type PathwayTableProps = {
    degreePathway: DegreePathway;
    major: string | null;
    isColumn?: boolean;
};

export default function PathwayTable({ degreePathway, major,  isColumn}: PathwayTableProps) {
    const Styles = isColumn
        ? "flex flex-col justify-start items-center w-11/12 sm:w-5/6 md:w-2/3 m-auto"
        : "grid grid-cols-1 gap-5 item-left m-auto";

    // Generate the JSX for the list of semesters
    const semesterElements = degreePathway.semesters.map(semester => {
        // Generate a unique key for the current semester
        const key = `${semester.name}-${semester.creditsAttempted}-${semester.creditsEarned}-${semester.courses.length}`;
        return <SemesterElement semester={semester} key={key} />;
    
    });

    return (
        <> 
            <h1 className={`
          text-xl
          mb-10
          text-center
          px-5
          py-2
          bg-light-gray
          rounded-xl
        `}>
                        Your generated pathway for:
                <br></br>
                <span className="
                            text-rowdy-blue
                        ">{major}</span>
            </h1><div className={`${Styles}`}>
            
                {semesterElements}
            </div></>
    );
}
