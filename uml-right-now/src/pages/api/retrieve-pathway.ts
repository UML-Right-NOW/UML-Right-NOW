/* eslint-disable indent */
/* eslint-disable no-case-declarations */
import clientPromise from "@/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";


// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     // // Ensure that the request is a POST request
//     // if (req.method !== "GET") {
//     //     res.status(405).send({ message: "This route accepts only GET requests" });
//     //     return;
//     // }


//     // Attempt to connect to the database
//     const client = await clientPromise;
//     if (!client) {
//         res.status(500).send({ message: "Failed to connect to DB" });
//         return;
//     } else {
//         res.status(500).send({ message: "Connected" });
//     }
//     const db = client.db("urn");
//     // TODO: Switch to URN database
//     const usersCollection = client.db("urm").collection("users");
//     const userPathwaysCollection = db.collection("user_pathways");

//     // Decode the body
//     try {
//         // Retrieve the user's object ID
//         const userEmail = req.body["userEmail"];
//         const user = await usersCollection.findOne({ email: userEmail });
//         if (!user) {
//             res.status(400).send({ message: "Invalid user" });
//             console.log("Not User");
//             return;
//         }

//         // Retrieve remaining data
//         const userId = user._id.toString();
//         const major = req.body["major"];
//         const pathways = req.body["pathway"];

//         // Find the pathway in the DB
//         await userPathwaysCollection.findOne({
//             userId: userId,
//             major: major,
//             pathway: pathways
//         }).then(insertRes => {
//             res.status(200).json(insertRes);
//             return;
//         });
//     } catch {
//         res.status(500).send({ message: "Failed to parse request body" });
//         return;
//     }

// }





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const userEmail = req.body["userEmail"];
    // const usersCollection = client.db("urm").collection("users");
    // const user = await usersCollection.findOne({ email: "johnersenyoute1@gmail.com" });

    // if (user) {
    //     console.log(user._id);
    // }
    const client = await clientPromise;
    if (client) {
        const db = client.db("urn");

        const userEmail = req.body["userEmail"];
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















// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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