import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { CatImagesEntity } from "../../domain/entities/cat.images.entity";
import { CatImagesService } from "../../infrastructure";

export class CatImagesController {
    constructor(private readonly catImagesService: CatImagesService) { }

    private handleError(error: unknown, res: Response) {
        console.log(error);

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }

    getImagesById = async (req: Request, res: Response) => {
        try {
            const { breed_image_id = 0 } = req.params;

            const catImages: CatImagesEntity = await this.catImagesService.getByBreedId(breed_image_id.toString());

            return res.json(catImages);
        } catch (error) {
            return this.handleError(error, res);
        }
    }
}