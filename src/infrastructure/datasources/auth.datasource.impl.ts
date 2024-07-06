import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
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