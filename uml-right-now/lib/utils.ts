import Course from "./classes/Course";

/**
 * Retrieves all courses from the DB.
 * @returns     An array of courses
 */
export async function getAllCourses(): Promise<Course[]> {
    const url = process.env.NODE_ENV === "production"
        ? "https://uml-right-now.vercel.app/api/courses"
        : "http://localhost:3000/api/courses";

    return new Promise((resolve, reject) => {
        fetch(url, {
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
