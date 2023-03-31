// Libraries
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
    removeCompletedCourses(completedCourses: Course[]) {
        // Store all of the pathway's courses in a single array
        let remainingCourses: Course[] = [];
        this.semesters.forEach(semester => {
            remainingCourses = remainingCourses.concat(semester.courses);
        });

        // Determine which courses have been completed and remove them from the array
        const usedCourses: Course[] = [];
        remainingCourses = remainingCourses.filter(remainingCourse => {
            // Search for the current course in the list of completed courses
            const matchingCourse = completedCourses.find(completedCourse => remainingCourse.code === completedCourse.code);

            if (matchingCourse === undefined) { // The current course wasn't found => keep it in the array
                return true;
            }

            // The current course was found => mark it as used and remove it from the array
            usedCourses.push(matchingCourse);
            return false;
        });

        // Determine which courses have not yet been used
        const unusedCourses = completedCourses.filter(completedCourse => {
            // Search for the completed course in the list of used courses
            const matchingCourse = usedCourses.find(usedCourse => usedCourse.code === completedCourse.code);

            // If the current course wasn't found in the list of used courses, keep it in the list of unused courses
            return matchingCourse === undefined;
        });

        // Match all unused courses to electives
        remainingCourses = DegreePathway._matchElectives(remainingCourses, unusedCourses);

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
     * Matches courses that have not yet been used to remaining electives (both department and general).
     * @param remainingCourses      The array of remaining courses with electives
     * @param unusedCourses         The array of courses that have not yet been used
     * @returns                     An array of courses that are still remaining after matching electives
     */
    private static _matchElectives(remainingCourses: Course[], unusedCourses: Course[]): Course[] {
        // Retrieve arrays of department and general electives
        const departmentElectives = DegreePathway._getDepartmentElectives(remainingCourses);
        const generalElectives = DegreePathway._getGeneralElectives(remainingCourses);

        // Retrieve an array of remaining courses that are not electives
        const miscCourses = remainingCourses.filter(course => {
            return !DegreePathway._isDepartmentElective(course.code) && !DegreePathway._isGeneralElective(course.code);
        });

        // Filter the department electives (MUST BE DONE FIRST)
        const filteredDepartmentElectives = departmentElectives.filter(departmentElective => {
            // Retrieve the current department elective's department code
            const departmentCode1 = DegreePathway._getCourseDepartment(departmentElective.code);

            // Attempt to find an unused course with the same department
            const matchingUnusedCourse = unusedCourses.find(unusedCourse => {
                const departmentCode2 = DegreePathway._getCourseDepartment(unusedCourse.code);
                return departmentCode1 === departmentCode2;
            });

            // If an unused course falls within the same department, both it and the current elective must be removed
            if (matchingUnusedCourse !== undefined) {
                // Remove the matched course from the list of unused courses
                unusedCourses = unusedCourses.filter(unusedCourse => unusedCourse.code !== matchingUnusedCourse.code);

                // Remove the current department elective from the list
                return false;
            }

            // If no unused course falls within the same department, it must be kept in the list
            return true;
        });

        // Filter the general electives (MUST BE DONE SECOND)
        const filteredGeneralElectives = generalElectives.filter((generalElective, index) => {
            return index >= unusedCourses.length;
        });

        // Concatenate the two arrays
        return miscCourses.concat(filteredDepartmentElectives).concat(filteredGeneralElectives);
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
                // Cache the current semester
                semesters.push(currSemester);

                // Determine the name of the semester
                currSemesterName = DegreePathway._getNextSemesterName(currSemesterName);

                // Initialize a new semester
                currSemester = new Semester(currSemesterName);
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
}
