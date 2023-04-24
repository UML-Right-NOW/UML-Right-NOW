import Course from "../classes/Course";
import CourseCode from "@/classes/CourseCode";

/**
 * Builder design pattern implementation for the Course class.
 * 
 * Design pattern reference: https://refactoring.guru/design-patterns/builder
 */
export default class CourseBuilder {
    // The internal course object
    private course: Course = Course.createDefault();

    /**
     * Replaces the current course object with a new, default one.
     */
    reset() {
        this.course = Course.createDefault();
    }

    /**
     * Retrieves the internal course object.
     * @returns     The internal course object
     */
    getCourse(): Course {
        return this.course;
    }

    /**
     * Sets the code property of the internal course object
     * @param value     The value to assign to the code property
     * @returns         The current builder object (allows for chaining using the dot operator)
     */
    code(value: CourseCode): CourseBuilder {
        this.course.code = value;
        return this;
    }

    /**
     * Sets the name property of the internal course object
     * @param value     The value to assign to the name property
     * @returns         The current builder object (allows for chaining using the dot operator)
     */
    name(value: string): CourseBuilder {
        this.course.name = value;
        return this;
    }

    /**
     * Sets the creditsAttempted property of the internal course object
     * @param value     The value to assign to the creditsAttempted property
     * @returns         The current builder object (allows for chaining using the dot operator)
     */
    creditsAttempted(value: number): CourseBuilder {
        this.course.creditsAttempted = value;
        return this;
    }

    /**
     * Sets the creditsEarned property of the internal course object
     * @param value     The value to assign to the creditsEarned property
     * @returns         The current builder object (allows for chaining using the dot operator)
     */
    creditsEarned(value: number): CourseBuilder {
        this.course.creditsEarned = value;
        return this;
    }

    /**
     * Sets the availableFall property of the internal course object
     * @param value     The value to assign to the availableFall property
     * @returns         The current builder object (allows for chaining using the dot operator)
     */
    availableFall(value: boolean): CourseBuilder {
        this.course.availableFall = value;
        return this;
    }

    /**
     * Sets the availableSpring property of the internal course object
     * @param value     The value to assign to the availableSpring property
     * @returns         The current builder object (allows for chaining using the dot operator)
     */
    availableSpring(value: boolean): CourseBuilder {
        this.course.availableSpring = value;
        return this;
    }
}
