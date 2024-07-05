import { Request, Response } from "express";
import { AuthRepository, RegisterUserDTO } from "../../domain";

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) { }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDTO] = RegisterUserDTO.create(req.body);
        if (error) return res.status(400).json({ message: error });


        this.authRepository.register(registerUserDTO!)
            .then((user) => { res.json(user) })
            .catch((error) => { res.status(500).json(error) });
    }

    loginUser = (req: Request, res: Response) => {
        res.json({ message: "Login User Controller" });
    }
}