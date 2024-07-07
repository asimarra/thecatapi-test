import { Router } from "express";
import { ApiCatService } from "../../infrastructure";
import { ApiCatController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class ApiCatRoutes {
    static get routes(): Router {
        const router = Router();

        const baseUrl = process.env.API_CAT_URL || "https://api.thecatapi.com/v1";
        const token = process.env.API_CAT_KEY || "YOUR_API_KEY";
        const apiCatService = new ApiCatService(baseUrl, token);

        // Api Cat Routes
        const apiCatController: ApiCatController = new ApiCatController(apiCatService);

        router.get("/", AuthMiddleware.validateJWT, apiCatController.getBreeds);
        router.get("/search", [AuthMiddleware.validateJWT], apiCatController.searchBreeds);
        router.get("/:breed_id", [AuthMiddleware.validateJWT], apiCatController.getBreedById);

        return router;
    }
}