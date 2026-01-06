import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { SecurityModule } from 'src/security/security.module';

@Module({
    imports: [PrismaModule, SecurityModule],
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