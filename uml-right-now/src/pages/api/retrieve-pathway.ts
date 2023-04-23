/* eslint-disable indent */
import clientPromise from "@/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //It gotta be a get request, not sure if that's gonna be usefull.
    if (req.method !== "GET") {
        res.status(405).send({ message: "This route accepts only POST requests" });
        return;
    }
    const client = await clientPromise;
    if (client) {
        const db = client.db("urn");
        const session = await getSession({ req });
        const user = await db.collection("users").findOne({ email: session?.user?.email });
        if (user) {
            console.log("");
            const thatUserPathWay = await db.collection("user_pathways").find({ userId: user._id.toString() }).toArray();
            switch (req.method) {
                case "GET":
                    if (user) {
                        switch (req.method) {
                            case "GET":
                                res.json({ status: 200, data: [thatUserPathWay, user] });
                                break;
                            default:
                                res.status(405).end(); // Method Not Allowed
                        }
                    }
                    break;
                default:
                    res.status(405).end(); // Method Not Allowed
            }
        }
    } else {
        res.status(500).send({ message: "Failed" });
    }
}
