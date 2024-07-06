import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authDataSource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(authDataSource);

        // Auth Routes
        const authController = new AuthController(authRepository);
        router.post("/login", authController.loginUser);
        router.post("/register", authController.registerUser);

        return router;
    }
}