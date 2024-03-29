import Course from "./Course";
import CourseCode from "./CourseCode";

export default class Semester {
    // Members
    name: string;
    courses: Course[] = [];
    creditsAttempted = 0;
    creditsEarned = 0;

    /**
     * Value constructor.
     * @param name      The name of the semester (i.e. "Fall 2019")
     * @param courses   The list of courses contained within the semester
     */
    constructor(name: string, courses?: Course[]) {
        this.name = name;
        if (courses) {
            courses.forEach(course => {
                this.addCourse(course);
            });
        }
    }

    /**
     * Adds a course to the semester's internal array of courses.
     * @param course    The course to add
     */
    addCourse(course: Course) {
        this.courses.push(course);
        this.creditsAttempted += course.creditsAttempted;
        this.creditsEarned += course.creditsEarned;
    }

    /**
     * Attempts to retrieve a course via a given course code.
     * @param courseCode    The course code associated with the desired course
     * @returns             The desired course if its found; null otherwise
     */
    getCourseByCode(courseCode: CourseCode): Course | undefined {
        return this.courses.find(course => course.code.equals(courseCode));
    }

    removeCourse(courseCode: CourseCode): void {
        // Subtract the course's credits from the semester
        const courseToRemove = this.courses.find(course => course.code.equals(courseCode));
        if (courseToRemove) {
            this.creditsAttempted -= courseToRemove.creditsAttempted;
            this.creditsEarned -= courseToRemove.creditsEarned;
        }
    
        // Remove the course from the semester
        this.courses = this.courses.filter(course => {
            return !course.code.equals(courseCode);
        });
    }
}
