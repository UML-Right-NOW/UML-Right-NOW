import CourseBuilder from "@/builders/CourseBuilder";
import Course from "@/classes/Course";
import CourseCode from "@/classes/CourseCode";
import DegreePathway from "@/classes/DegreePathway";
import Semester from "@/classes/Semester";
import clientPromise from "@/mongo";
import { NextApiRequest, NextApiResponse } from "next";

// Types
type Data = {
    pathway: DegreePathway
};
type Message = {
    message: string
}
type CourseDocument = {
    code: string,
    name: string,
    credits: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Message>
) {
    // Ensure that the request is a POST request
    if (req.method !== "POST") {
        res.status(405).send({ message: "This route accepts only POST requests" });
        return;
    }

    // Attempt to connect to the DB
    const client = await clientPromise;
    if (!client) {
        res.status(500).send({ message: "Failed to connect to database "});
        return;
    }

    // Select the DB
    const db = client.db("urn");

    // Select the pathways collection
    const collection = db.collection("pathways");

    // Assemble the query
    const query = { major: req.body };

    // Execute the query
    const pathwayDocument = await collection.findOne(query);
    if (!pathwayDocument) {
        res.status(500).send({ message: "Failed to retrieve data" });
        return;
    }

    // Retrieve the list of courses from the document
    const courses: Course[] = pathwayDocument["courses"].map((course: CourseDocument) => {
        // Initialize a course builder
        const courseCode = new CourseCode(course["code"]);
        const builder = new CourseBuilder()
            .code(courseCode)
            .name(course["name"])
            .creditsAttempted(parseFloat(course["credits"]))
            .creditsEarned(0);

        return builder.getCourse();
    });

    // Determine the Fall/Spring availability of each course
    const courseCodeValues = courses.map(course => course.code.value.toUpperCase());
    const dbCourses = await db.collection("courses").find({ code: { $in: courseCodeValues } }).toArray();
    if (dbCourses) {
        dbCourses.forEach(dbCourse => {
            // Retrieve the course from the database with the same code as the current course
            const matchingCourse = courses.find(course => {
                const dbCourseCode = new CourseCode(dbCourse["code"]);
                return course.code.equals(dbCourseCode);
            });

            // Set the Fall/Spring availability of the current course
            if (matchingCourse) {
                matchingCourse.availableFall = dbCourse["fall"];
                matchingCourse.availableSpring = dbCourse["spring"];
            }
        });
    }

    // Store all the courses in a single semester
    const pathway = new DegreePathway([
        new Semester("", courses)
    ]);

    // Return the degree pathway to the frontend
    res.status(200).json({ pathway: pathway });
}
