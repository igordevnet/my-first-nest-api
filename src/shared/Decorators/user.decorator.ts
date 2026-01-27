import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const UserDecorator = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
        throw new NotFoundException('User does not found.')
    }

    return request.user
});