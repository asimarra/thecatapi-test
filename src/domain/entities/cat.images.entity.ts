export class CatImagesEntity {
    public id: string;
    public url: string;
    public width: string;
    public height: string;

    constructor(id: string, url: string, width: string, height: string) {
        this.id = id;
        this.url = url;
        this.width = width;
        this.height = height;
    }
}