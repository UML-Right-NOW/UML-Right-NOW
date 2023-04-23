import Course from "@/classes/Course";

/**
 * Singleton design pattern implementation; allows for the (massive) list of
 * courses stored in the DB to be retrieved once and made globally accessible.
 * 
 * !!!NOTE: When using this class, you must check the "ready" member variable
 * to ensure that the courses have been retrieved. Otherwise, the "courses"
 * array will be empty. For easy initialization:
 * 
 *      await CourseManager.instance.waitForRead();
 * 
 * Design pattern reference: https://refactoring.guru/design-patterns/singleton
 */
export default class CoursesManager {
    // Members
    private static _instance: CoursesManager;
    courses: Course[] = [];

    /**
     * Default constructor.
     */
    private constructor() { /* */ }

    /**
     * Retrieves the CourseManager instance.
     */
    static get instance() {
        return this._instance || (this._instance = new this());
    }
}
