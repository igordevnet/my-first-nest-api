import {
  BadRequestException,
  Injectable,
  Post,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SecurityService } from "src/security/security.service";
import { AuthMessage } from "src/shared/messages/auth-message";
import { LoginUserDTO } from "src/core/user/dto/login-user.dto";
import { UserService } from "src/core/user/user.service";

@Injectable()
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly securityService: SecurityService
  ) { }

  async login(loginUserDto: LoginUserDTO): Promise<AuthMessage> {
    const user = await this.userService.findByEmail(loginUserDto.email);

    await this.securityService.comparePassword(loginUserDto.password, user.password);

    const token = await this.generateToken(String(user.id_user));

    return { message: "Login sucessful", token, user };

  }

  public generateToken(payload: string): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  public async decodeToken(token: string): Promise<string> {
    try {
      return `${await this.jwtService.verifyAsync(token)}`;
    } catch {
      throw new BadRequestException("Please log in again.");
    }
  }
}