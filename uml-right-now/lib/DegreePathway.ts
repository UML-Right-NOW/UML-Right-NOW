import Semester from "./Semester";
import Course from "./Course";

// Constants
const MIN_CREDITS_PER_SEMESTER = 12;
const SEPTEMBER_INT = 9;

export default class DegreePathway {
    // Members
    semesters: Semester[];

    /**
     * Value constructor.
     * @param semesters 
     */
    constructor(semesters: Semester[]) {
        this.semesters = semesters;
    }

    /**
     * Removes all courses that have been completed from the internal array of semesters. This algorithm will first
     * remove completed courses that are direct matches for internal courses (i.e. comp 1020 and comp 1020). The
     * algorithm will then attempt to match remaining completed courses to remaining elective requirements (both
     * department and general electives). Finally, the algorithm will sort the resulting list of incomplete courses
     * into an array of future semesters based on the minimum credits that must be taken per semester. This array
     * of semesters is stored within the DegreePathway instance, NOT returned.
     * @param completedCourses      The list of completed courses to remove from the internal list of semesters
     */
    matchCompletedCourses(completedCourses: Course[]) {
        // Compile all of the pathway's courses in a single array
        let remainingCourses = this._getRemainingCourses();

        // Match all explicit course requirements
        [remainingCourses, completedCourses] = DegreePathway._matchExplicitCourseRequirements(remainingCourses, completedCourses);

        // Match all unused courses to electives
        remainingCourses = DegreePathway._matchElectives(remainingCourses, completedCourses);

        // Sort the remaining courses into future semesters
        this.semesters = DegreePathway._createFutureSemesters(remainingCourses);
    }

    /**
     * Organizes the pathway's current list of semesters based on _createFutureSemesters
     */
    organizeSemesters() {
        // Concatenate each semesters' courses into a single array
        let courses: Course[] = [];
        this.semesters.forEach(semester => {
            courses = courses.concat(semester.courses);
        });

        // Create future semesters
        this.semesters = DegreePathway._createFutureSemesters(courses);
    }

    /**
     * Compiles all semesters' courses into a single array.
     * @returns     The compiled array of courses
     */
    private _getRemainingCourses(): Course[] {
        let remainingCourses: Course[] = [];
        this.semesters.forEach(semester => {
            remainingCourses = remainingCourses.concat(semester.courses);
        });

        return remainingCourses;
    }

    /**
     * Matches completed courses to as many explicit course requirements as possible.
     * @param remainingCourses      The list of remaining courses to match
     * @param completedCourses      The list of courses that have been completed
     * @returns                     A tuple of two course arrays in which the first is an 
     *                              updated array of remaining courses and the second is an
     *                              updated array of completed courses
     */
    private static _matchExplicitCourseRequirements(remainingCourses: Course[], completedCourses: Course[]): [Course[], Course[]] {
        // Filter explicit course matches
        const usedCourseCodes: string[] = [];
        remainingCourses = remainingCourses.filter(remainingCourse => {
            // Retrieve the current course code
            const currCourseCode = remainingCourse.code;

            // EDGE CASE: check for requirements that can be satisfied by multiple courses
            const courseCodeOptions: string[] = [];
            if (currCourseCode.includes("/")) {
                // Split the course code by the optional delimeter (/)
                const currCourseCodeSplit = currCourseCode.split("/");

                // Iterate over each substring
                for (let i = 0; i < currCourseCodeSplit.length; i++) {
                    // Retrieve the current course code
                    const curr = currCourseCodeSplit[i].trim();

                    // Ensure that the course code is valid
                    if (!DegreePathway._isValidCourseCode(curr)) {
                        // Clear the array of course code options
                        courseCodeOptions.length = 0;

                        // If the current substring is not valid, none of the substrings can be considered valid
                        break;
                    }

                    // If the course code is valid, append it to the array of course code options
                    courseCodeOptions.push(curr);
                }
            }

            // Search for the current course in the list of completed courses
            const matchingCourse = courseCodeOptions.length > 0
                ? completedCourses.find(completedCourse => { // One or more cours code options are present => each one must be checked
                    for (let i = 0; i < courseCodeOptions.length; i++) {
                        const curr = courseCodeOptions[i];
                        if (DegreePathway._courseCodesEqual(curr, completedCourse.code)) {
                            return true;
                        }
                    }
                    return false;
                })
                : completedCourses.find(completedCourse => { // No course code options are present => look for a direct match
                    return DegreePathway._courseCodesEqual(currCourseCode, completedCourse.code);
                });

            if (matchingCourse === undefined) { // The current course wasn't found => keep it in the array
                return true;
            }

            // The current course was found => mark it as used and remove it from the array
            usedCourseCodes.push(matchingCourse.code);
            return false;
        });

        // Retrieve a list of courses that haven't yet been used
        completedCourses = DegreePathway._getUnusedCourses(completedCourses, usedCourseCodes);

        return [remainingCourses, completedCourses];
    }

    /**
     * Determines which courses within an array of completed courses have been applied and should be removed.
     * @param completedCourses      The array of completed courses
     * @param usedCourseCodes       An array of courses codes that have been applied
     * @returns                     An array of courses that haven't yet been applied
     */
    private static _getUnusedCourses(completedCourses: Course[], usedCourseCodes: string[]): Course[] {
        return completedCourses.filter(completedCourse => {
            // Search for the completed course in the list of used courses
            const matchingCourse = usedCourseCodes.find(usedCourseCode => DegreePathway._courseCodesEqual(usedCourseCode, completedCourse.code));

            // If the current course wasn't found in the list of used courses, keep it in the list of unused courses
            return matchingCourse === undefined;
        });
    }

    /**
     * Matches courses that have not yet been used to remaining electives (both department and general).
     * @param remainingCourses      The array of remaining courses with electives
     * @param unusedCourses         The array of courses that have not yet been used
     * @returns                     An array of courses that are still remaining after matching electives
     */
    private static _matchElectives(remainingCourses: Course[], unusedCourses: Course[]): Course[] {
        // Retrieve arrays of department and general electives
        let departmentElectives = DegreePathway._getDepartmentElectives(remainingCourses);
        let generalElectives = DegreePathway._getGeneralElectives(remainingCourses);

        // Match department electives (MUST BE DONE FIRST)
        [departmentElectives, unusedCourses] = DegreePathway._matchDepartmentElectives(departmentElectives, unusedCourses);

        // Match general electives (MUST BE DONE SECOND)
        [generalElectives, unusedCourses] = DegreePathway._matchGeneralElectives(generalElectives, unusedCourses);

        // Retrieve an array of miscellaneous courses
        const miscCourses = DegreePathway._getMiscCourses(remainingCourses);

        // Concatenate the three arrays
        return miscCourses.concat(departmentElectives).concat(generalElectives);
    }

    private static _matchDepartmentElectives(departmentElectives: Course[], unusedCourses: Course[]): [Course[], Course[]] {
        // Match as many unused courses to department elective requirements as possible
        departmentElectives = departmentElectives.filter(departmentElective => {
            // Retrieve the current department elective's department code
            const departmentCode1 = DegreePathway._getCourseDepartment(departmentElective.code);

            // Attempt to find an unused course with the same department
            const matchingUnusedCourse = unusedCourses.find(unusedCourse => {
                const departmentCode2 = DegreePathway._getCourseDepartment(unusedCourse.code);
                return DegreePathway._courseCodesEqual(departmentCode1, departmentCode2);
            });

            // If an unused course falls within the same department, both it and the current elective must be removed
            if (matchingUnusedCourse !== undefined) {
                // Remove the matched course from the list of unused courses
                unusedCourses = unusedCourses.filter(unusedCourse => !DegreePathway._courseCodesEqual(unusedCourse.code, matchingUnusedCourse.code));

                // Remove the current department elective from the list
                return false;
            }

            // If no unused course falls within the same department, it must be kept in the list
            return true;
        });

        return [departmentElectives, unusedCourses];
    }

    private static _matchGeneralElectives(generalElectives: Course[], unusedCourses: Course[]): [Course[], Course[]] {
        // Initialization
        const usedCourseCodes: string[] = [];

        // Match as many unused courses to general elective requirements as possible
        generalElectives = generalElectives.filter((_generalElective, index) => {
            if (index >= unusedCourses.length) {
                return true;
            }

            usedCourseCodes.push(unusedCourses[index].code);
            return false;
        });

        // Remove used courses from the list of unused courses
        unusedCourses = unusedCourses.filter(unusedCourse => {
            // Iterate over all used course codes
            for (let i = 0; i < usedCourseCodes.length; i++) {
                const curr = usedCourseCodes[i];
                if (DegreePathway._courseCodesEqual(curr, unusedCourse.code)) {
                    // The current course code was found in the list of used course codes => remove the course from the array
                    return false;
                }
            }

            // The current course code was not found in the list of used course codes => keep the course in the array
            return true;
        });

        return [generalElectives, unusedCourses];
    }

    /**
     * Organizes a given list of courses into a list of semesters that will occur in the future.
     * @param courses       The list of courses to organize into a list of semesters
     * @returns             The generated list of semesters
     */
    private static _createFutureSemesters(courses: Course[]): Semester[] {
        // Initialization
        const semesters: Semester[] = [];

        // Create the semesters
        let currSemesterName: string = DegreePathway._getNextSemesterName(null);
        let currSemester = new Semester(currSemesterName);
        for (let i = 0; i < courses.length; i++) {
            if (currSemester.creditsAttempted >= MIN_CREDITS_PER_SEMESTER || i === courses.length - 1) {
                // EDGE CASE: handle empty semesters
                if (currSemester.courses.length > 0) {
                    // Cache the current semester
                    semesters.push(currSemester);

                    // Determine the name of the semester
                    currSemesterName = DegreePathway._getNextSemesterName(currSemesterName);

                    // Initialize a new semester
                    currSemester = new Semester(currSemesterName);
                }
            } else {
                // Retrieve the current course
                const course = courses[i];

                // Add the course to the current semester
                currSemester.addCourse(course);
            }
        }

        return semesters;
    }

    /**
     * Determines the name of the next semester based on the current semester.
     * @param currSemesterName      The current semester
     * @returns                     The name of the next semester
     */
    private static _getNextSemesterName(currSemesterName: string | null) {
        let nextYear, nextSeason;
        if (currSemesterName) {
            const currSemesterNameSplit = currSemesterName.split(" ");
            if (currSemesterNameSplit.length === 2) {
                // Retrieve the year and season from the semester name
                const [yearString, season] = currSemesterNameSplit;

                // Determine the next semester's name
                nextYear = parseInt(yearString);
                nextSeason = "";
                if (season === "fall") {
                    nextYear++;
                    nextSeason = "spring";
                } else {
                    nextSeason = "fall";
                }
            }
        } else {
            // Determine the current month and year
            const dateObj = new Date();
            const currMonth = dateObj.getUTCMonth();
            const currYear = dateObj.getUTCFullYear();

            // Determine the next semester's name
            if (currMonth >= SEPTEMBER_INT) { // Currently Fall
                nextYear = currYear + 1;
                nextSeason = "spring";
            } else { // Currently Spring
                nextYear = currYear;
                nextSeason = "fall";
            }
        }

        return `${nextYear} ${nextSeason}`;
    }

    /**
     * Filters an array of courses to find all department electives.
     * @param courses       The array of courses to filter
     * @returns             An array of department electives
     */
    private static _getDepartmentElectives(courses: Course[]): Course[] {
        return courses.filter(course => DegreePathway._isDepartmentElective(course.code));
    }

    /**
     * Filters an array of courses to find all general electives.
     * @param courses       The array of courses to filter
     * @returns             An array of general electives
     */
    private static _getGeneralElectives(courses: Course[]): Course[] {
        return courses.filter(course => DegreePathway._isGeneralElective(course.code));
    }

    /**
     * Determines which courses in a given array of courses are neither departmenet electives nor general electives.
     * @param courses   The array of courses
     * @returns         The array of miscellaneous courses
     */
    private static _getMiscCourses(courses: Course[]): Course[] {
        return courses.filter(course => {
            return !DegreePathway._isDepartmentElective(course.code) && !DegreePathway._isGeneralElective(course.code);
        });
    }

    /**
     * Determines whether a given course code represents a department elective.
     * @param courseCode    The course code to check
     * @returns             true if the course code represents a department elective; false otherwise
     */
    private static _isDepartmentElective(courseCode: string): boolean {
        // Retrieve the department code and course number
        const departmentCode = DegreePathway._getCourseDepartment(courseCode);
        const courseNumber = DegreePathway._getCourseNumber(courseCode);

        return departmentCode !== "xxxx" && courseNumber === "xxxx";
    }

    /**
     * Determines whether a given course code represents a general elective
     * @param courseCode    The course code to check
     * @returns             true if the course code represents a department elective; false otherwise
     */
    private static _isGeneralElective(courseCode: string): boolean {
        // Retrieve the department code and course number
        const departmentCode = DegreePathway._getCourseDepartment(courseCode);
        const courseNumber = DegreePathway._getCourseNumber(courseCode);

        return departmentCode === "xxxx" && courseNumber === "xxxx";
    }

    /**
     * Retrieves a course's department code.
     * @param courseCode    The course code from which to extract the deparmtent code
     * @returns             The department code if the provided course code is valid; null otherwise
     */
    private static _getCourseDepartment(courseCode: string): string | null {
        const split = courseCode.split(".");
        if (split.length !== 2) {
            return null;
        }

        return split[0];
    }

    /**
     * Retrieves a course's number
     * @param courseCode    The course code from which to extract the course number
     * @returns             The course number if the provided course code is valid; null otherwise
     */
    private static _getCourseNumber(courseCode: string): string | null {
        const split = courseCode.split(".");
        if (split.length !== 2) {
            return null;
        }

        return split[1];
    }

    /**
     * Determines whether a given string represents a valid course code
     * @param str   The string to check
     * @returns     true if the given string represents a valid course code; false otherwise
     */
    private static _isValidCourseCode(str: string) : boolean {
        // Retrieve the course code and department 
        const courseDepartment = DegreePathway._getCourseDepartment(str);
        const courseNumber = DegreePathway._getCourseNumber(str);

        // Null check
        if (courseDepartment === null || courseNumber === null) {
            return false;
        }

        return courseDepartment.length === 4 && (courseNumber.length === 4 || courseNumber.length === 5);
    }

    /**
     * Determines whether two given course codes are equal.
     * @param code1     The first course code
     * @param code2     The second course code
     * @returns         true if the course codes are equal; false otherwise
     */
    private static _courseCodesEqual(code1: string | null, code2: string | null): boolean {
        if (!code1 && !code2) { // Handle both null, empty, or undefined
            return true;
        } else if (!code1 || !code2) { // Handle a single null, empty, or undefined
            return false;
        } else if (DegreePathway._courseIsLab(code1) && DegreePathway._courseIsLab(code2)) { // EDGE CASE: Handle labs with differing suffixes
            return code1.slice(0, code1.length - 1) === code2.slice(0, code2.length - 1);
        }

        return code1 === code2;
    }

    /**
     * Determines whether a given course code represents a lab course
     * @param courseCode    The course code to check
     * @returns             true if the given course code represents a lab; false otherwise
     */
    private static _courseIsLab(courseCode: string) {
        // Immediately return false if the given string is null, empty, undefined, or not a course code
        if (!courseCode || !DegreePathway._isValidCourseCode(courseCode)) {
            return false;
        }

        // Retrieve the last character
        const lastChar = courseCode[courseCode.length - 1];

        return lastChar === "l" || lastChar === "r";
    }
}
