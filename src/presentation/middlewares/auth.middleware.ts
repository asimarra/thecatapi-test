import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../../domain";
import { jwtAdapter } from "../../config/jwtAdapter";
import { UserModel } from "../../data/mongodb";
import { JwtPayload } from "jsonwebtoken";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.header('Authorization');
            if (!authorization) return res.status(401).json({ message: 'Token not provided' });
            if (!authorization.startsWith('Bearer ')) return res.status(401).json({ message: 'Invalid token' });

            const [_, token = ""] = authorization.split(' ');
            const payload = await jwtAdapter.validateToken(token) as JwtPayload;
            if (!payload) return res.status(401).json({ message: 'Invalid token' });

            const user = await UserModel.findById(payload.id);
            if (!user) return res.status(401).json({ message: 'Invalid token' });

            req.body.user = new UserEntity(user.id, user.name, user.email, user.password);

            next();
        } catch (error: any) {
            console.error(error);

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            } else {
                return res.status(401).json({ error: 'Invalid token' });
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    };
}