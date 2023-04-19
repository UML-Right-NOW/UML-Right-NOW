import * as dotenv from "dotenv";
import mongoose from "mongoose";

// Retrieve environment variables
dotenv.config();

// Retrieve and validate the MongoDB URI
const URI = process.env.MONGO_URI;

if(!URI) {
    throw new Error("Invalid env variable: MONGO_URI");
}

export const connectToMongoDB = async () => {
    try {
        const { connection } = await mongoose.connect(URI);

        if(connection.readyState === 1) {
            return Promise.resolve(true);
        }

    } catch (error) {
        return Promise.reject(error);
    }
};