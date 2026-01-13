import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SecurityService } from "src/shared/security/security.service";
import { AuthMessage } from "src/shared/messages/auth-message";
import { LoginUserDTO } from "src/core/user/dto/login-user.dto";
import { UserService } from "src/core/user/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { Message } from "../messages/message";
import { ResetPasswordDTO } from "src/core/user/dto/resetPassword-user.dto";
import { User } from "../Decorators/user.decorator";

@Injectable()
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly securityService: SecurityService,
    private readonly prismaService: PrismaService
  ) { }

  async login(loginUserDto: LoginUserDTO): Promise<AuthMessage> {
    const user = await this.userService.findByEmail(loginUserDto.email);

    await this.securityService.comparePassword(loginUserDto.password, user.password);

    const token = await this.generateToken(String(user.id_user));

    return { message: "Login sucessful.", token, user };

  }

  async forgotPassword(email: string): Promise<Message>{
    const user = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });

    if(!user){
      throw new NotFoundException('This email does not exist.');
    }

    return { message: 'Email sent successfully.'}
  }

  async resetPassword(dto: ResetPasswordDTO): Promise<Message> {
    const hashPassword = await this.securityService.hashPassword(dto.password);

    await this.prismaService.user.update({
      data: {
        password: hashPassword
      },
      where: {
        email: dto.email
      }
    })

    return { message: 'Password changed successfully.'}
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

  public async getUserByToken(@User() user){
    return user;
  }
}