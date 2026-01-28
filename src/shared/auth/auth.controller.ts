import { Controller, Post, Body, Patch, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthMessage } from 'src/shared/messages/auth-message';
import { Message } from '../messages/message';
import { LoginUserDTO } from 'src/core/user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UserDecorator } from '../Decorators/user.decorator';
import { Roles } from '../Decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RoleGuard } from './guards/role.guard';
import { ResetPasswordDTO } from 'src/core/user/dto/resetPassword-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: LoginUserDTO): Promise<AuthMessage> {
        return this.authService.login(dto);
    }

    @Patch('reset')
    async resetPassword(@Body() dto: ResetPasswordDTO): Promise<Message> {
        return this.authService.resetPassword(dto);
    }

/*
    @Patch('forgot')
    async forgotPassword(@Body('email') email): Promise<Message> {
        return this.authService.forgotPassword(email);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Get('token')
    @UseGuards(AuthGuard)
    async testToken(@Headers('token') token): Promise<String> {
        return this.authService.decodeToken(token);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Get('user')
    async getUserByToken(@UserDecorator() user) {
        return user;
    }*/
}
