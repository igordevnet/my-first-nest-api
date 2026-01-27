import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name_user: string;

    @IsStrongPassword()
    password: string;

    @IsEmail()
    email: string;

    @IsOptional()
    role?: number;
}