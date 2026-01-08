import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthMessage } from 'src/shared/messages/auth-message';
import { Message } from '../messages/message';
import { LoginUserDTO } from 'src/core/user/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: LoginUserDTO): Promise<AuthMessage> {
        return this.authService.login(dto);
    }

    @Patch('forgot')
    async forgotPassword(@Body('email') email): Promise<Message> {
        return this.authService.forgotPassword(email);
    }
}
