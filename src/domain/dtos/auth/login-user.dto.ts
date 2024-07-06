import { Validators } from '../../../config/validators';

export class LoginUserDTO {
    private constructor(
        public email: string,
        public password: string
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
        const { email, password } = object;

        if (!email) return ["Email is required"];
        if (!Validators.email.test(email)) return ["Email is not valid"];
        if (!password) return ["Password is required"];

        return [
            undefined,
            new LoginUserDTO(email.toLowerCase(), password)
        ]
    }
}