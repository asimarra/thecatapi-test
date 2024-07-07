import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserEntity } from '../domain';

const SECRET = process.env.JWT_SECRET || 'secret';
const EXPIRE_IN = process.env.JWT_EXPIRE_IN || '1h';

export class jwtAdapter {
    static async generateToken(payload: UserEntity): Promise<string> {
        return jwt.sign(payload, SECRET, { expiresIn: EXPIRE_IN });
    }

    static async validateToken(token: string): Promise<JwtPayload | string> {
        return jwt.verify(token, SECRET);
    }
}