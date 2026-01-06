import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { compare, hash } from "bcrypt";

@Injectable()
export class SecurityService {
    public constructor(private readonly configService: ConfigService) {}

    public hashPassword(password: string): Promise<string> {
        const saltRounds = Number(
            this.configService.get('BCRYPT_SALT_ROUNDS', 10),
        );
        return hash(password, saltRounds);
    }

    public async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<void> {
        const isValid = await compare(password, hashedPassword);
        if (!isValid) throw new UnauthorizedException("Incorrect Password.");
    }
}