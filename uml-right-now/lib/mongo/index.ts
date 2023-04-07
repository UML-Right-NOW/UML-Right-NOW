import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

// Retrieve environment variables
dotenv.config();

// Retrieve and validate the MongoDB URI
const URI = process.env.MONGO_URI;
if (!URI) {
    throw new Error("Add MongoDB URI to .env file");
}

// Initialize the client
const client = new MongoClient(URI);

// Attempt to connect to the client
let clientPromise: Promise<MongoClient> | null = null;
try {
    clientPromise = client.connect();
} catch (err) {
    console.log(err);
}

// Export the client promise to expose it to the rest of the application
export default clientPromise;
