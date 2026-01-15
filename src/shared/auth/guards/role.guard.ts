import { CanActivate, ExecutionContext, ForbiddenException, Global, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/shared/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])

        const { user } = context.switchToHttp().getRequest();

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        if (!requiredRoles) {
            return true;
        }

        if (!user || !user.role) {
            throw new ForbiddenException('User not authenticated');
        }


        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException(
                'Your user has no access to this route.',
            );
        }

        return true;
    }
}