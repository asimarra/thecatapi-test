export class BreedEntity {
    public id: string;
    public name: string;
    public description: string;
    public temperament: string;
    public origin: string;
    public image_id: string;

    constructor(id: string, name: string, description: string, temperament: string, origin: string, image_id: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.temperament = temperament;
        this.origin = origin;
        this.image_id = image_id;
    }
}