import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";

const REVIEW_CREDENTIAL_MESSAGE = 'Review your credentials';

export class AuthDataSourceImpl implements AuthDataSource {
    async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
        try {
            const { email, password } = loginUserDTO;

            const userData = await UserModel.findOne({ email });
            if (!userData) throw CustomError.badRequest(REVIEW_CREDENTIAL_MESSAGE);

            const isValidPassword = bcryptAdapter.compare(password, userData.password);
            if (!isValidPassword) throw CustomError.badRequest(REVIEW_CREDENTIAL_MESSAGE);

            return new UserEntity(userData.id, userData.name, userData.email, userData.password);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internal();
        }
    }

    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        try {
            const { name, email, password } = registerUserDTO;

            const exists = await UserModel.findOne({ email });
            if (exists) throw CustomError.badRequest('User already exists');

            const user = await UserModel.create({
                name,
                email,
                password: bcryptAdapter.hash(password)
            });
            await user.save();

            return new UserEntity(user.id, name, email, user.password);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internal();
        }
    }
}