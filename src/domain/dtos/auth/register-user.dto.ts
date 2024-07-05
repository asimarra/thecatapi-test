import { Validators } from '../../../config/validators';
export class RegisterUserDTO {
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
        const { name, email, password } = object;

        if (!name) return ["Name is required"];
        if (!email) return ["Email is required"];
        if (!Validators.email.test(email)) return ["Email is not valid"];
        if (!password) return ["Password is required"];
        if (password.length < 6) return ["Password too short"];

        return [
            undefined,
            new RegisterUserDTO(name, email.toLowerCase(), password)
        ]
    }
}