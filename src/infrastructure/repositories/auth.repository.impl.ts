import { AuthDataSource, AuthRepository, RegisterUserDTO, UserEntity } from "../../domain";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly authDataSource: AuthDataSource
    ) { }

    async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDTO);
    }

    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDTO);
    }
}