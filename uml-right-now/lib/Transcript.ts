// Libraries
import Semester from "./Semester";

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
}
