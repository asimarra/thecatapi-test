import { AuthDataSource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        try {
            const { name, email, password } = registerUserDTO;

            // 1. Validate if the email exists in the database

            // 2. Hash the password

            // 3. Map the response to the UserEntity

            return new UserEntity("1", name, email, password);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internal();
        }
    }
}