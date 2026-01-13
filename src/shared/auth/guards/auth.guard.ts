import { CanActivate, ExecutionContext, ForbiddenException, Global, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserService } from "src/core/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new ForbiddenException('Please log in again.');
        }

        const token = authHeader.split(' ')[1];

        const payload = await this.authService.decodeToken(token);

        if (!payload) {
            throw new ForbiddenException('Invalid token.');
        }

        request.user = await this.userService.getUser(Number(payload));
         
        return true;
    }
}