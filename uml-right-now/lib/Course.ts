export default class Course {
    code: string;
    name: string;
    creditsAttempted: number;
    creditsEarned: number;
    didPass: boolean;
    constructor(code: string, name: string, creditsAttempted: number, creditsEarned: number) {
        this.code = code.toLowerCase();
        this.name = name.toLowerCase();
        this.creditsAttempted = creditsAttempted;
        this.creditsEarned = creditsEarned;
        this.didPass = this.creditsAttempted === this.creditsEarned;
    }
}
