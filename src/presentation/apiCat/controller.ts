import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { ApiCatService } from "../../infrastructure";
import { BreedEntity } from "../../domain/entities/breed.entity";
import { Filters } from "../../application/interfaces/thirdparty/api.cat.interfaces";

export class ApiCatController {
    constructor(private readonly apiCatService: ApiCatService) { }

    private handleError(error: unknown, res: Response) {
        console.log(error);

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }

    getBreeds = async (req: Request, res: Response) => {
        try {
            const { limit = 10, page = 0 } = req.query;

            const breeds: BreedEntity[] = await this.apiCatService.getAll(+limit.toString(), +page.toString());
            return res.json(breeds);
        } catch (error) {
            return this.handleError(error, res);
        }
    }

    getBreedById = async (req: Request, res: Response) => {
        try {
            const { breed_id = 0 } = req.params;

            const breed: BreedEntity = await this.apiCatService.getById(breed_id.toString());
            return res.json(breed);
        } catch (error) {
            return this.handleError(error, res);
        }
    }

    searchBreeds = async (req: Request, res: Response) => {
        try {
            const filters: Filters = {
                q: req.query.bread_name as string,
            };

            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 0;

            const breeds: BreedEntity[] = await this.apiCatService.search(filters, limit, page);
            return res.json(breeds);
        } catch (error) {
            return this.handleError(error, res);
        }
    }
}