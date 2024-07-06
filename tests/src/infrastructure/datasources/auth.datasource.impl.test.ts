import { UserModel } from "../../../../src/data/mongodb";
import { CustomError, RegisterUserDTO } from "../../../../src/domain";
import { AuthDataSourceImpl } from "../../../../src/infrastructure";

jest.mock("../../../../src/data/mongodb");

const userData: RegisterUserDTO = { name: "Angie", email: "aaa@gmail.com", password: "password123" };

describe("AuthDataSourceImpl", () => {
    let authDataSource: AuthDataSourceImpl;

    beforeEach(() => {
        authDataSource = new AuthDataSourceImpl();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("register", () => {
        it("should throw an error if user already exists", async () => {
            UserModel.findOne = jest.fn().mockResolvedValue({
                id: "1",
                name: userData.name,
                email: userData.email,
                password: userData.password,
            });

            await expect(authDataSource.register(userData)).rejects.toThrow(
                CustomError.badRequest("User already exists")
            );

            expect(UserModel.findOne).toHaveBeenCalledWith({ email: userData.email });
        });

        it("should throw an internal server error if an error occurs", async () => {
            UserModel.findOne = jest.fn().mockRejectedValue(new Error("Controlled Error"));

            await expect(authDataSource.register(userData)).rejects.toThrow(
                CustomError.internal()
            );
            expect(UserModel.findOne).toHaveBeenCalledWith({ email: userData.email });
        });

        it("should register a new user", async () => {
            const registerResult = {
                id: "1",
                name: userData.name,
                email: userData.email,
                password: "hashed-password",
            }
            UserModel.findOne = jest.fn().mockResolvedValue(null);
            UserModel.create = jest.fn().mockResolvedValue({
                ...registerResult,
                save: jest.fn(),
            });

            const result = await authDataSource.register(userData);

            expect(UserModel.findOne).toHaveBeenCalledWith({ email: userData.email });
            expect(UserModel.create).toHaveBeenCalledWith({
                name: userData.name,
                email: userData.email,
                password: expect.any(String),
            });
            expect(result).toEqual(registerResult);
        });
    });
});