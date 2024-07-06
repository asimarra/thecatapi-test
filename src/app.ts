import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017",
        dbName: process.env.MONGO_DB_NAME || "catAPI"
    });

    new Server({
        port: process.env.PORT ? +process.env.PORT : 3100,
        routes: AppRoutes.routes
    }).start();
}