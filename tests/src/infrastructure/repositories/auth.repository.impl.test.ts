import { AuthDataSource, RegisterUserDTO, UserEntity } from "../../../../src/domain";
import { AuthRepositoryImpl } from "../../../../src/infrastructure";

const userData: RegisterUserDTO = { name: "Angie", email: "aaa@gmail.com", password: "password123" };

class AuthDataSourceImpl implements AuthDataSource {
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
        it("should return the result from authDataSource.register", async () => {
            const expectedUserEntity: UserEntity = { id: "1", ...userData };
            authDataSource.register = jest.fn().mockResolvedValue(expectedUserEntity);

            const result = await authRepository.register(userData);

            expect(authDataSource.register).toHaveBeenCalledWith(userData);
            expect(result).toEqual(expectedUserEntity);
        });
    });
});