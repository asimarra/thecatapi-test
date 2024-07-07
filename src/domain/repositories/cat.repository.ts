import { Filters } from "../../application/interfaces/thirdparty/api.cat.interfaces";
import { BreedEntity } from "../entities/breed.entity";

export abstract class CatRepository {
    abstract getAll(limit: number, page: number): Promise<BreedEntity[]>;
    abstract getById(id: string): Promise<BreedEntity>;
    abstract search(filters: Filters): Promise<BreedEntity[]>;
}