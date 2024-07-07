import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDTO, UserEntity } from "../../domain";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";
import { jwtAdapter } from "../../config/jwtAdapter";
import { AuthEntity } from "../../domain/entities/auth.entity";

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) { }

    private handleError(error: unknown, res: Response) {
        console.log(error);

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUserDTO] = RegisterUserDTO.create(req.body);
        if (error) return res.status(400).json({ message: error });

        try {
            const user = await this.authRepository.register(registerUserDTO!);
            return res.json(user);
        } catch (error) {
            return this.handleError(error, res);
        }
    }

    loginUser = async (req: Request, res: Response) => {
        const [error, loginUserDTO] = LoginUserDTO.create(req.body);
        if (error) return res.status(400).json({ message: error });

        try {
            const loggedUser = await this.authRepository.login(loginUserDTO!);

            const tokenPayload = {
                id: loggedUser.id,
                name: loggedUser.name,
                email: loggedUser.email
            };
            const token = jwtAdapter.generateToken(tokenPayload);

            return res.json(new AuthEntity(tokenPayload, token));
        } catch (error) {
            return this.handleError(error, res);
        }
    }
}