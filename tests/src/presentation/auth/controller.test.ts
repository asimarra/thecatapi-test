import * as httpMock from 'node-mocks-http';
import { AuthController } from "../../../../src/presentation/auth/controller";
import { AuthDataSource, RegisterUserDTO, UserEntity } from "../../../../src/domain";

let req: any, res: any, next;

const userData: RegisterUserDTO = { name: "Angie", email: "aaa@gmail.com", password: "password123" };

class AuthDataSourceImpl implements AuthDataSource {
    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.")
    }
}

describe("AuthController", () => {
    let authRepository: AuthDataSourceImpl;
    let authController: AuthController;

    beforeEach(() => {
        authRepository = new AuthDataSourceImpl();
        authController = new AuthController(authRepository);

        req = httpMock.createRequest();
        res = httpMock.createResponse();
        next = null;
    });

    describe("registerUser", () => {
        it("should return 400 if invalid request body", async () => {
            req.body = {};
            authController.registerUser(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: expect.any(String) });
        });

        it("should return 500 if any error occurs", async () => {
            req.body = userData;
            authRepository.register = jest.fn().mockRejectedValue(new Error());
            await authController.registerUser(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: expect.any(String) });
        });

        it("should return the registered user if registration is successful", async () => {
            req.body = userData;
            const registeredUser = { ...userData, id: 1 };
            authRepository.register = jest.fn().mockResolvedValue(registeredUser);

            await authController.registerUser(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(registeredUser);
            expect(authRepository.register).toHaveBeenCalledWith(expect.any(RegisterUserDTO));
        });
    });
});
