import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { ApiCatRoutes } from "./apiCat/routes";
import { CatImagesRoutes } from "./catImages/routes";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.get("/", (_, res) => {
            res.json({ message: "Cat API is running..." });
        });

        router.use("/api/auth", AuthRoutes.routes);
        router.use("/api/breeds", ApiCatRoutes.routes);
        router.use("/api/images", [AuthMiddleware.validateJWT], CatImagesRoutes.routes);

        return router;
    }
}