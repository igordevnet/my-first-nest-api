import { Controller, Post, Body, Patch, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthMessage } from 'src/shared/messages/auth-message';
import { Message } from '../messages/message';
import { LoginUserDTO } from 'src/core/user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { User } from '../Decorators/user.decorator';

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

    @Get('token')
    @UseGuards(AuthGuard)
    async testToken(@Headers('token') token): Promise<String> {
        return this.authService.decodeToken(token);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async getUserByToken(@User() user){
        return user;
    }
}
