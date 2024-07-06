import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: Options) {
        try {
            const { mongoUrl, dbName } = options;

            await mongoose.connect(mongoUrl, {
                dbName
            });

            console.log("Connected to MongoDB");
            return true;
        } catch (error) {
            console.log("Error connecting to MongoDB");
            throw error
        }
    }
}