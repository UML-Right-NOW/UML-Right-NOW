import CourseBuilder from "@/builders/CourseBuilder";
import CourseCode from "@/classes/CourseCode";
import DegreePathway from "@/classes/DegreePathway";
import Semester from "@/classes/Semester";
import clientPromise from "@/mongo";
import CoursesManager from "@/singletons/CoursesManager";
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

    // Initialize the CoursesManager instance if applicable
    await CoursesManager.instance.waitForReady();

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
    const courses = pathwayDocument["courses"].map((course: CourseDocument) => {
        // Initialize a course builder
        const courseCode = new CourseCode(course["code"]);
        const builder = new CourseBuilder()
            .code(courseCode)
            .name(course["name"])
            .creditsAttempted(parseFloat(course["credits"]))
            .creditsEarned(0);

        // Attempt to find a matching couse in the catalog
        const matchingCourse = CoursesManager.instance.courses.find(umlCourse => {
            return courseCode.equals(umlCourse.code);
        });

        if (matchingCourse) {
            builder.availableFall(matchingCourse.availableFall);
            builder.availableSpring(matchingCourse.availableSpring);
        }

        return builder.getCourse();
    });

    // Store all the courses in a single semester
    const pathway = new DegreePathway([
        new Semester("", courses)
    ]);

    // Return the degree pathway to the frontend
    res.status(200).json({ pathway: pathway });
}
