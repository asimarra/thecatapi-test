import { CatImagesEntity } from "../entities/cat.images.entity";

export abstract class CatImagesRepository {
    abstract getByBreedId(breedId: string): Promise<CatImagesEntity>;
}