import Course from "./Course";

export default class Semester {
    name: string;
    courses: Course[];
    creditsAttempted = 0;
    creditsEarned = 0;
    constructor(name: string, courses: Course[]) {
        this.name = name;
        this.courses = courses;
        this.courses.forEach(course => {
            this.creditsAttempted += course.creditsAttempted;
            this.creditsEarned += course.creditsEarned;
        });
    }
}
