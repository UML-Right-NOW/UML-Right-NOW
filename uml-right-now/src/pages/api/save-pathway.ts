import DegreePathway from "@/DegreePathway";
import clientPromise from "@/mongo";
import { Document, InsertOneResult } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// Types
type MessageResponseType = {
    message: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MessageResponseType | InsertOneResult<Document>>
) {
    // Ensure that the request is a POST request
    if (req.method !== "POST") {
        res.status(405).send({ message: "This route accepts only POST requests" });
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
    const usersCollection = client.db("urn").collection("users");
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
}
