import { UserEntity } from "./user.entity";

export class AuthEntity {
    public userData: UserEntity
    public token: string;

    constructor(userData: UserEntity, token: string) {
        this.userData = userData;
        this.token = token;
    }
}