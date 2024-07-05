import { RegisterUserDTO } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
    abstract register(registerUserDTO: RegisterUserDTO): Promise<UserEntity>
}