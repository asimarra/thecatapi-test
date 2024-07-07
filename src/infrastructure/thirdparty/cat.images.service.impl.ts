import axios, { AxiosInstance } from "axios";
import { CatImagesEntity } from "../../domain/entities/cat.images.entity";
import { CatImagesRepository } from "../../domain/repositories/cat.images.repository";

export class CatImagesService implements CatImagesRepository {
    private baseUrl: string;
    private token: string;
    private axiosInstance: AxiosInstance;
    private images: string = "images";

    constructor(baseUrl: string, token: string) {
        this.baseUrl = baseUrl;
        this.token = token;

        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            timeout: 1000,
            headers: { 'x-api-key': this.token }
        });
    }

    async getByBreedId(breedId: string): Promise<CatImagesEntity> {
        const response = await this.axiosInstance.get(`${this.baseUrl}/${this.images}/${breedId}`);
        const data = response.data || [];
        return new CatImagesEntity(data.id, data.url, data.width, data.height);
    }
}