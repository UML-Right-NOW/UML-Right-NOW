/* eslint-disable indent */
/* eslint-disable no-case-declarations */
import clientPromise from "@/mongo";
import { NextApiRequest, NextApiResponse } from "next";

// Types
type MessageResponseType = {
    message: string
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<MessageResponseType>) {
    // Ensure that the request is a POST request
    if (req.method !== "GET") {
        res.status(405).send({ message: "This route accepts only Get requests" });
        return;
    }
    // Ensure that a body has been provided
    if (!req.body) {
        res.status(400).send({ message: "No request body was provided" });
    }

    // Attempt to connect to the database
    const client = await clientPromise;
    if (!client) {
        res.status(500).send({ message: "Failed to connect to DB" });
        return;
    }
    const db = client.db("urn");
    // TODO: Switch to URN database
    const usersCollection = client.db("test").collection("users");
    const userPathwaysCollection = db.collection("user_pathways");

    // Decode the body
    try {
        // Retrieve the user's object ID
        const userEmail = req.body["userEmail"];
        const user = await usersCollection.findOne({ email: userEmail });
        if (!user) {
            res.status(400).send({ message: "Invalid user" });
            return;
        }

        // Retrieve remaining data
        const userId = user._id.toString();
        const major = req.body["major"];
        const degreePathway = req.body["pathway"] as DegreePathway;

        // Save the pathway to the DB
        await userPathwaysCollection.insertOne({
            userId: userId,
            major: major,
            pathway: degreePathway
        }).then(insertRes => {
            res.status(200).json(insertRes);
            return;
        }).catch(err => {
            res.status(500).send(err);
            return;
        });
    } catch {
        res.status(500).send({ message: "Failed to parse request body" });
        return;
    }


    switch (req.method) {
        case "GET":
            const allPosts = await db.collection("user_pathways").find({}).toArray();
            res.json({ status: 200, data: allPosts });
            break;
        default:
            res.status(405).end(); // Method Not Allowed
    }
}











// export default async function handler(req, res) {
//     const client = await clientPromise;
//     const db = client.db("urn");

//     switch (req.method) {
//         case "GET":
//             const allPosts = await db.collection("user_pathways").find({}).toArray();
//             res.json({ status: 200, data: allPosts });
//             break;
//         default:
//             res.status(405).end(); // Method Not Allowed
//     }
// }
