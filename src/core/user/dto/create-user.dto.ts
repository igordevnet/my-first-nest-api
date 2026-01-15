import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsStrongPassword()
    password: string;

    @IsEmail()
    email: string;

    @IsOptional()
    role?: number;
}