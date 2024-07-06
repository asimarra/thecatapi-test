import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDTO } from "../../domain";

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) { }

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.error(error); // todo: implement a good logger
        return res.status(500).json({ message: "Internal Server Error" });
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDTO] = RegisterUserDTO.create(req.body);
        if (error) return res.status(400).json({ message: error });


        this.authRepository.register(registerUserDTO!)
            .then((user) => { res.json(user) })
            .catch((error) => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        res.json({ message: "Login User Controller" });
    }
}