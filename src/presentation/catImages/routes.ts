import { Router } from "express";
import { CatImagesService } from "../../infrastructure";
import { CatImagesController } from "./controller";

export class CatImagesRoutes {
    static get routes(): Router {
        const router = Router();

        const baseUrl = process.env.API_CAT_URL || "https://api.thecatapi.com/v1";
        const token = process.env.API_CAT_KEY || "YOUR_API_KEY";
        const catImagesService = new CatImagesService(baseUrl, token);

        // Images by Breed Id Routes
        const catImagesController: CatImagesController = new CatImagesController(catImagesService);

        router.get("/:breed_image_id", catImagesController.getImagesById);

        return router;
    }
}