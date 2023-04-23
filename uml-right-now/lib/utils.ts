import Course from "./classes/Course";

/**
 * Retrieves all courses from the DB.
 * @returns     An array of courses
 */
export async function getAllCourses(): Promise<Course[]> {
    return new Promise((resolve, reject) => {
        fetch("/api/courses", {
            method: "POST"
        }).then(res => {
            res.json().then(data => {
                resolve(data["courses"] as Course[]);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}
