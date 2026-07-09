import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
    );
}

const uri: string = MONGODB_URI;

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
    mongoose?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongoose ?? {
    conn: null,
    promise: null,
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = cached;
}

// Reuse the existing connection in development to avoid opening multiple sockets.
async function connectToDatabase(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const options: mongoose.ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(uri, options);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default connectToDatabase;
