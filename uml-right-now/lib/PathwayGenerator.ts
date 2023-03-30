// Libraries
import Transcript from "./Transcript";
import DegreePathway from "./DegreePathway";
import Semester from "./Semester";
import Course from "./Course";

export default class PathwayGenerator {
    static async generateDegreePathway(major: string, transcript: Transcript | null): Promise<DegreePathway> {
        return new Promise((resolve, reject) => {
            // 1. Generate a full degree pathway for the given major
            PathwayGenerator._generateFullPathway(major).then(fullPathway => {
                if (transcript) {
                    // 2. If a transcript has been provided, retrieve a list of all completed courses.
                    const completedCourses = transcript.getCompletedCourses();

                    // 3. Remove all completed courses from the full degree pathway
                    fullPathway.removeCompletedCourses(completedCourses);
                } else {
                    // 4. Simply organize the pathway's semesters if no transcript was provided
                    fullPathway.organizeSemesters();
                }
            
                return resolve(fullPathway);
            }).catch(err => {
                reject(err);
            });
        });
    }

    private static async _generateFullPathway(major: string): Promise<DegreePathway> {
        return new Promise((resolve, reject) => {
            // Retrieve the pathway from the backend
            fetch("/api/pathway", {
                method: "POST",
                body: major,
                headers: {
                    "Content-Type": "text/plain",
                }
            }).then(res => {
                res.json().then(data => {
                    const semester = new Semester("");
                    const courses = data["pathway"]["semesters"][0]["courses"];
                    courses.forEach((course: Course) => {
                        semester.addCourse(course);
                    });
                    resolve(new DegreePathway([semester]));
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                reject(err);
            });
        });
    }
}
