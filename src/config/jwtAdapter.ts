import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserEntity } from '../domain';

const SECRET = process.env.JWT_SECRET || 'secret';
const EXPIRE_IN = process.env.JWT_EXPIRE_IN || '1h';

export class jwtAdapter {
    static generateToken(payload: UserEntity): string {
        return jwt.sign(payload, SECRET, { expiresIn: EXPIRE_IN });
    }

    static validateToken(token: string): JwtPayload | string {
        return jwt.verify(token, SECRET);
    }
}