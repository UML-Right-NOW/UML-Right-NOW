// Libraries
import Course from "./Course";

export default class Transcript {
    // Members
    courses: Course[];

    /**
     * Value constructor.
     * @param semesters     The list of semesters that the transcript consists of.
     */
    constructor(courses: Course[]) {
        this.courses = courses;
    }

    /**
     * Retrieves all courses within the transcript that have been completed.
     * @returns     The list of completed courses
     */
    getCompletedCourses(): Course[] {
        const completedCourses: Course[] = [];
        this.courses.forEach(course => {
            if (course.didPass) {
                completedCourses.push(course);
            }
        });

        return completedCourses;
    }
}
