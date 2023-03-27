// Libraries
import Transcript from "./Transcript";
import DegreePathway from "./DegreePathway";
import Semester from "./Semester";
import Course from "./Course";

export default class PathwayGenerator {
    static generateDegreePathway(major: string, transcript: Transcript | null): DegreePathway {
        // 1. Generate a full degree pathway for the given major
        const fullPathway = PathwayGenerator._generateFullPathway(major);

        if (transcript) {
            // 2. If a transcript has been provided, retrieve a list of all completed courses.
            const completedCourses = transcript.getCompletedCourses();

            // 3. Remove all completed courses from the full degree pathway
            fullPathway.removeCompletedCourses(completedCourses);
        }
    
        return fullPathway;
    }

    private static _generateFullPathway(major: string): DegreePathway {
        // TODO: Implement
        return new DegreePathway([
            new Semester("", [
                new Course("honr 1100", "", 3, 0),
                new Course("comp 1010", "", 3, 0),
                new Course("comp 1030l", "", 1, 0),
                new Course("math 1310", "", 4, 0),
                new Course("xxxx xxxx", "", 3, 0),
            ]),
            new Semester("", [
                new Course("engl 1020", "", 3, 0),
                new Course("comp 1020", "", 3, 0),
                new Course("comp 1040l", "", 1, 0),
                new Course("math 1320", "", 4, 0),
                new Course("xxxx xxxx", "", 3, 0),
            ]),
            new Semester("", [
                new Course("comp 2010", "", 3, 0),
                new Course("comp 2010l", "", 1, 0),
                new Course("comp 2030", "", 3, 0),
                new Course("comp 2030r", "", 1, 0),
                new Course("math 2190", "", 3, 0),
                new Course("eece 2650", "", 3, 0),
            ]),
            new Semester("", [
                new Course("engl 2200", "", 3, 0),
                new Course("comp 2040", "", 3, 0),
                new Course("math 3220", "", 3, 0),
                new Course("math 3860", "", 3, 0),
                new Course("xxxx xxxx", "", 4, 0),
            ]),
            new Semester("", [
                new Course("comp 3040", "", 3, 0),
                new Course("comp 3050", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
            ]),
            new Semester("", [
                new Course("comp 3010", "", 3, 0),
                new Course("comp 3080", "", 3, 0),
                new Course("xxxx xxxx", "", 4, 0),
                new Course("xxxx xxxx", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
            ]),
            new Semester("", [
                new Course("comp 4040", "", 3, 0),
                new Course("comp xxxx", "", 3, 0),
                new Course("comp xxxx", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
            ]),
            new Semester("", [
                new Course("comp xxxx", "", 3, 0),
                new Course("comp xxxx", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
                new Course("xxxx xxxx", "", 3, 0),
            ]),
        ]);
    }
}
