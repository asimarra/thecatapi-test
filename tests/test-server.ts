import { AppRoutes } from "../src/presentation/routes";
import { Server } from "../src/presentation/server";

export const testServer = new Server({
    port: process.env.PORT ? +process.env.PORT : 3100,
    routes: AppRoutes.routes
});
