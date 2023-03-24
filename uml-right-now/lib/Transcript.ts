// Libraries
import Semester from "./Semester";
import Course from "./Course";

export default class Transcript {
    // Members
    semesters: Semester[];

    /**
     * Value constructor.
     * @param semesters     The list of semesters that the transcript consists of.
     */
    constructor(semesters: Semester[]) {
        this.semesters = semesters;
    }

    /**
     * Retrieves all courses within the transcript that have been completed.
     * @returns     The list of completed courses
     */
    getCompletedCourses(): Course[] {
        const completedCourses: Course[] = [];
        this.semesters.forEach(semester => {
            semester.courses.forEach(course => {
                if (course.didPass) {
                    completedCourses.push(course);
                }
            });
        });

        return completedCourses;
    }
}
