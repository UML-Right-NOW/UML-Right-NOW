// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/mongo";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string
}

async function testDB() {
    const client = await clientPromise;
    if (!client) {
        console.log("DB connection failed");
        return;
    }

    const db = client.db();
    console.log(db);
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    testDB();
    res.status(200).json({ name: "John Doe" });
}
