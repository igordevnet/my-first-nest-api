import { BadRequestException, NestMiddleware, Next } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);

        console.log('UserIdMiddleware', 'Before');

        if (isNaN(id) || id <= 0) {
            throw new BadRequestException('Invalid ID!');
        }

        console.log('UserIdMiddleware', 'After');

        next();
    }
}