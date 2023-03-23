// Libraries
import Semester from "./Semester";

export default class DegreePathway {
    semesters: Semester[];
    constructor(semesters: Semester[]) {
        this.semesters = semesters;
    }
}
