export default class CourseCode {
    // Members
    value: string;
    
    /**
     * Default constructor.
     */
    constructor(value: string) {
        this.value = value.toLowerCase();
    }

    /**
     * Retrieves the department portion of the course code.
     * @returns     The department portion of the course code or null if the course code is invalid
     */
    getDepartment(): string | null {
        const split = this.value.split(".");
        if (split.length !== 2) {
            return null;
        }

        return split[0];
    }

    /**
     * Retrieves the numeric portion of the course code. 
     * @returns     The numeric portion of the course code or null if the course code is invalid
     */
    getNumber(): string | null {
        const split = this.value.split(".");
        if (split.length !== 2) {
            return null;
        }

        return split[1];
    }

    /**
     * Determines whether the course code is valid.
     * @returns     Whether the course code is valid
     */
    isValid() : boolean {
        // Retrieve the course code and department 
        const courseDepartment = this.getDepartment();
        const courseNumber = this.getDepartment();

        // Null check
        if (courseDepartment === null || courseNumber === null) {
            return false;
        }

        return courseDepartment.length === 4 && (courseNumber.length === 4 || courseNumber.length === 5);
    }

    /**
     * Determines if the calling CourseCode object is equal to a given course code object.
     * @param other     The other CourseCode object
     * @returns         true if the two CourseCode objects are equal, false otherwise
     */
    equals(other: CourseCode | null): boolean {
        if (!this.value && !other) { // Handle both null, empty, or undefined
            return true;
        } else if (!this.value || !other) { // Handle a single null, empty, or undefined
            return false;
        } else if (this.isLab() && other.isLab()) { // EDGE CASE: Handle labs with differing suffixes
            return this.value.slice(0, this.value.length - 1) === other.value.slice(0, other.value.length - 1);
        }

        return this.value === other.value;
    }

    /**
     * Determines whether the course code represents a lab.
     * @returns     true if the course code represents a lab, false otherwise.
     */
    isLab(): boolean {
        // Immediately return false if the given string is null, empty, undefined, or not a course code
        if (!this.isValid()) {
            return false;
        }

        // Retrieve the last character
        const lastChar = this.value[this.value.length - 1];

        return lastChar === "l" || lastChar === "r";
    }

    /**
     * Determines whether a given course code represents a department elective.
     * @param courseCode    The course code to check
     * @returns             true if the course code represents a department elective; false otherwise
     */
    isDepartmentElective(): boolean {
        // Retrieve the department code and course number
        const departmentCode = this.getDepartment();
        const courseNumber = this.getNumber();

        return departmentCode !== "xxxx" && courseNumber === "xxxx";
    }

    /**
     * Determines whether a given course code represents a general elective
     * @param courseCode    The course code to check
     * @returns             true if the course code represents a department elective; false otherwise
     */
    isGeneralElective(): boolean {
        // Retrieve the department code and course number
        const departmentCode = this.getDepartment();
        const courseNumber = this.getNumber();

        return departmentCode === "xxxx" && courseNumber === "xxxx";
    }

    /**
     * Equivalent to the String.includes() method.
     * @param str   The substring to search for
     * @returns     true if the substring was found, false otherwise
     */
    includes(str: string): boolean {
        return this.value.includes(str);
    }

    /**
     * Equivalent to the String.split() method.
     * @param str   The substring to split on
     * @returns     An array of CourseCode objects
     */
    split(str: string): CourseCode[] {
        const split = this.value.split(str);
        return split.map(str => new CourseCode(str));
    }
}
