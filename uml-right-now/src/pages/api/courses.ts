import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/mongo";
import Course from "@/classes/Course";
import CourseBuilder from "@/builders/CourseBuilder";

// Types
type Message = {
    message: string;
}
type Data = {
    courses: Course[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Message | Data>
) {
    // Ensure that the request was a POST request
    if (req.method !== "POST") {
        res.status(405).send({ message: "This route only accepts POST requests" });
        return;
    }

    // Attempt to connect to the DB
    const client = await clientPromise;
    if (!client) {
        res.status(500).send({ message: "Failed to connect to the database" });
        return;
    }

    // Attempt to retrieve all courses from the DB
    const db = client.db("urn");
    const courseDocuments = await db.collection("courses")
        .find()
        .toArray();
    if (!courseDocuments) {
        res.status(500).send({ message: "Failed to retrieve data"} );
        return;
    }

    // Convert the course data into course objects
    const courses: Course[] = courseDocuments.map(doc => {
        return new CourseBuilder()
            .code(doc["code"])
            .name(doc["name"])
            .creditsAttempted(parseInt(doc["credits"]))
            .creditsEarned(0)
            .availableFall(doc["fall"])
            .availableSpring(doc["spring"])
            .getCourse();
    });

    res.status(200).send({ courses: courses });
}
