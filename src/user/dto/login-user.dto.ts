import { IsEmail } from "class-validator";

export class LoginUserDTO {
    @IsEmail()
    email: string;

    password: string;
}