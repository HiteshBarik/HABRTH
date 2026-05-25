import mongoose from "mongoose";

const MONGODB_URI = process?.env?.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let mongoConnectionPromise: Promise<typeof mongoose> | null = null;

export const connectToMongoDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }

    if (!mongoConnectionPromise) {
      mongoConnectionPromise = mongoose.connect(MONGODB_URI).then((connection) => {
        console.log("Connected to MongoDB");
        return connection;
      });
    }

    return await mongoConnectionPromise;
  } catch (error) {
    mongoConnectionPromise = null;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
