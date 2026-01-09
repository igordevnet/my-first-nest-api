import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService) { }

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

        request.user = payload;
        return true;
    }
}