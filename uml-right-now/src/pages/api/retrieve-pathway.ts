/* eslint-disable indent */
/* eslint-disable no-case-declarations */
import clientPromise from "@/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    if (client) {
        const db = client.db("urn");
        const session = await getSession({ req });

        switch (req.method) {
            case "GET":
                const user = await db.collection("users").findOne({ email: session?.user?.email });
                if (user) {
                    //res.json({ status: 200, data: user._id.toString() });
                    switch (req.method) {
                        case "GET":
                            //console.log(user);
                            const thatUserPathWay = await db.collection("user_pathways").find({ userId: user._id.toString() }).toArray();
                            res.json({ status: 200, data: thatUserPathWay });
                            break;
                        default:
                            res.status(405).end(); // Method Not Allowed
                    }
                }
                break;
            default:
                res.status(405).end(); // Method Not Allowed
        }
    } else {
        res.status(500).send({ message: "Failed" });
    }
}
