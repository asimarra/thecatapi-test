import { AuthDataSource, RegisterUserDTO, UserEntity } from "../../../../src/domain";
import { LoginUserDTO } from "../../../../src/domain/dtos/auth/login-user.dto";
import { AuthRepositoryImpl } from "../../../../src/infrastructure";

const userData: RegisterUserDTO = { name: "Angie", email: "aaa@gmail.com", password: "password123" };

class AuthDataSourceImpl implements AuthDataSource {
    async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.")
    }
}

describe("AuthRepositoryImpl", () => {
    let authRepository: AuthRepositoryImpl;
    let authDataSource: AuthDataSource;

    beforeEach(() => {
        authDataSource = new AuthDataSourceImpl();
        authRepository = new AuthRepositoryImpl(authDataSource);
    });

    describe("Register method", () => {
        it("should register correctly.", async () => {
            const expectedUserEntity: UserEntity = { id: "1", ...userData };
            authDataSource.register = jest.fn().mockResolvedValue(expectedUserEntity);

            const result = await authRepository.register(userData);

            expect(authDataSource.register).toHaveBeenCalledWith(userData);
            expect(result).toEqual(expectedUserEntity);
        });
    });

    describe("Login method", () => {
        it("should login correctly.", async () => {
            const loginUserDTO: LoginUserDTO = { email: userData.email, password: userData.password };
            const expectedUserEntity: UserEntity = { id: "1", ...userData };
            authDataSource.login = jest.fn().mockResolvedValue(expectedUserEntity);

            const result = await authRepository.login(loginUserDTO);

            expect(authDataSource.login).toHaveBeenCalledWith(loginUserDTO);
            expect(result).toEqual(expectedUserEntity);
        });
    });
});