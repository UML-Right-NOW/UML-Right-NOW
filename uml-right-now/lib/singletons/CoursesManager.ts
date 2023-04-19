import Course from "@/classes/Course";
import { getAllCourses } from "@/utils";

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
    ready = false;

    /**
     * Default constructor.
     */
    private constructor() {
        getAllCourses().then(res => {
            this.courses = res;
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            this.ready = true;
        });
    }

    static get instance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * Waits for the instance to finish retrieving courses from the DB.
     * @returns     A resolved promise once all courses have been retrieved.
     */
    async waitForReady(): Promise<void> {
        if (this.ready) {
            console.log("Ready");
            return Promise.resolve();
        }
        console.log("Not ready");

        // Sleep
        await new Promise(resolve => setTimeout(resolve, 100));

        // Recursion, baby
        return this.waitForReady();
    }
}
