import Course from "./Course";

export default class Semester {
    // Members
    name: string;
    courses: Course[];
    creditsAttempted = 0;
    creditsEarned = 0;

    /**
     * Value constructor.
     * @param name      The name of the semester (i.e. "Fall 2019")
     * @param courses   The list of courses contained within the semester
     */
    constructor(name: string, courses: Course[]) {
        this.name = name;
        this.courses = courses;
        this.courses.forEach(course => {
            this.creditsAttempted += course.creditsAttempted;
            this.creditsEarned += course.creditsEarned;
        });
    }

    /**
     * Attempts to retrieve a course via a given course code.
     * @param courseCode    The course code associated with the desired course
     * @returns             The desired course if its found; null otherwise
     */
    getCourseByCode(courseCode: string): Course | null {
        const courses = this.courses.filter(course => course.code === courseCode);
        return courses.length === 1
            ? courses[0]
            : null;
    }
}
