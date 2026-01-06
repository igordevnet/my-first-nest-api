import { Controller, Post, Body } from '@nestjs/common';
import { AuthMessage } from 'src/shared/messages/auth-message';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: LoginUserDTO): Promise<AuthMessage> {
        return this.authService.login(dto);
    }
}
