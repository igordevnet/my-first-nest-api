import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { UserIdCheckMiddleware } from 'src/shared/middlewares/user-id-check.middleware';
import { SecurityModule } from 'src/shared/security/security.module';
import { AuthModule } from 'src/shared/auth/auth.module';


@Module({
    imports: [PrismaModule, SecurityModule, AuthModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).exclude(
            { path: 'users/login', method: RequestMethod.ALL },
            { path: 'users/register', method: RequestMethod.ALL },
        ).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        });
    }
}