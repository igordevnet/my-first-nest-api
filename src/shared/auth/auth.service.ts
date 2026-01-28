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
import { Message } from "../messages/message";
import { ResetPasswordDTO } from "src/core/user/dto/resetPassword-user.dto";
import { Repository } from "typeorm";
import { User } from "src/core/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDecorator } from "../Decorators/user.decorator";

@Injectable()
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly securityService: SecurityService,
  ) { }

  async login(loginUserDto: LoginUserDTO): Promise<AuthMessage> {
    const user = await this.userService.findByEmail(loginUserDto.email);

    await this.securityService.comparePassword(loginUserDto.password, user.password);

    const token = await this.generateToken(String(user.id_user));

    return { message: "Login sucessful.", token, user };

  }

  async forgotPassword(email: string): Promise<Message> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('This email does not exist.');
    }

    return { message: 'Email sent successfully.' }
  }

  async resetPassword(dto: ResetPasswordDTO): Promise<Message> {
    const hashedPassword = await this.securityService.hashPassword(dto.password);

    await this.userRepository.update(
      { email: dto.email },
      { 
        password: hashedPassword, 
        updated_at: new Date()
      }
    )

    return { message: 'Password changed successfully.' }
  }

  public generateToken(payload: string): Promise<string> {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    return this.jwtService.signAsync(payload);
  }

  public async decodeToken(token: string): Promise<string> {
    try {
      return `${await this.jwtService.verifyAsync(token)}`;
    } catch {
      throw new BadRequestException("Please log in again.");
    }
  }

  public async getUserByToken(@UserDecorator() user) {
    return user;
  }
}