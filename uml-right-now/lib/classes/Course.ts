import CourseCode from "./CourseCode";

export default class Course {
    code: CourseCode;
    name: string;
    creditsAttempted: number;
    creditsEarned: number;
    didPass: boolean;
    availableFall = true;
    availableSpring = true;
    constructor(
        code: CourseCode, 
        name: string, 
        creditsAttempted: number, 
        creditsEarned: number,
        availableFall?: boolean,
        availableSpring?: boolean
    ) {
        this.code = code;
        this.name = name.toLowerCase();
        this.creditsAttempted = creditsAttempted;
        this.creditsEarned = creditsEarned;
        this.didPass = this.creditsAttempted === this.creditsEarned;
        if (availableFall !== undefined) {
            this.availableFall = availableFall;
        }
        if (availableSpring !== undefined) {
            this.availableSpring = availableSpring;
        }
    }

    static createDefault(): Course {
        return new Course(new CourseCode(""), "", 0, 0);
    }
}
