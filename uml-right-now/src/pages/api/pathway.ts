// Next
import { NextApiRequest, NextApiResponse } from "next";

// Database
import clientPromise from "@/mongo";

// Libraries
import DegreePathway from "@/DegreePathway";
import Course from "@/Course";
import Semester from "@/Semester";

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

    let pathway = new DegreePathway([]);

    // Select the DB
    const db = client.db("urn");

    // Select the pathways collection
    const collection = db.collection("pathways");

    // Assemble the query
    const query = { major: req.body };

    // Execute the query
    const pathwayDocument = await collection.findOne(query);
    if (pathwayDocument) {
        // Retrieve the list of courses from the document
        const courses: Course[] = [];
        pathwayDocument["courses"].forEach((course: CourseDocument) => {
            courses.push(new Course(
                course["code"],
                course["name"],
                parseFloat(course["credits"]),
                0.0
            ));
        });

        // Store all the courses in a single semester
        pathway = new DegreePathway([
            new Semester("", courses)
        ]);
    }

    // Return the degree pathway to the frontend
    res.status(200).json({ pathway: pathway });
}
