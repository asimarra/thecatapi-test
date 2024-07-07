import axios, { AxiosInstance } from 'axios';
import { CatRepository } from '../../domain/repositories/cat.repository';
import { BreedEntity } from '../../domain/entities/breed.entity';
import { Filters } from '../../application/interfaces/thirdparty/api.cat.interfaces';
import { Utils } from '../../config/utils';

export class ApiCatService implements CatRepository {
    private baseUrl: string;
    private token: string;
    private axiosInstance: AxiosInstance;
    private breed: string = "breeds";

    constructor(baseUrl: string, token: string) {
        this.baseUrl = baseUrl;
        this.token = token;

        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            timeout: 1000,
            headers: { 'x-api-key': this.token }
        });
    }

    async getAll(limit: number = 10, page: number = 0): Promise<BreedEntity[]> {
        const response = await this.axiosInstance.get(`${this.baseUrl}/${this.breed}?limit=${limit}&page=${page}`);
        const data = response.data || [];

        return data.map((breed: any) => new BreedEntity(breed.id, breed.name, breed.description, breed.temperament, breed.origin, breed.reference_image_id));
    }

    async getById(id: string): Promise<BreedEntity> {
        const response = await this.axiosInstance.get(`${this.baseUrl}/${this.breed}/${id}`);
        const data = response.data || {};
        return new BreedEntity(data.id, data.name, data.description, data.temperament, data.origin, data.reference_image_id);
    }

    async search(filters: Filters, limit: number = 10, page: number = 0): Promise<BreedEntity[]> {
        const params = Utils.dinamicURLSearchParams({ ...filters, limit, page });

        const response = await this.axiosInstance.get(`${this.baseUrl}/${this.breed}/search?${params}`);
        const data = response.data || [];

        return data.map((breed: any) => new BreedEntity(breed.id, breed.name, breed.description, breed.temperament, breed.origin, breed.reference_image_id));
    }
}