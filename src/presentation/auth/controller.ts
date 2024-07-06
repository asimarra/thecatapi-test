import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDTO } from "../../domain";

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) { }

    private handleError(error: unknown, res: Response) {
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

    loginUser = (req: Request, res: Response) => {
        res.json({ message: "Login User Controller" });
    }
}