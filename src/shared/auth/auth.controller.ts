import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthMessage } from 'src/shared/messages/auth-message';
import { LoginUserDTO } from 'src/core/user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDTO } from 'src/core/user/dto/forgotPassword-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: LoginUserDTO): Promise<AuthMessage> {
        return this.authService.login(dto);
    }

    @Patch('forgot')
    async forgotPassword(@Body() dto: ForgotPasswordDTO){
        return this.authService.forgotPassword(dto);
    }
}
