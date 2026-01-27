import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserIdCheckMiddleware } from 'src/shared/middlewares/user-id-check.middleware';
import { SecurityModule } from 'src/shared/security/security.module';
import { AuthModule } from 'src/shared/auth/auth.module';
import { FileModule } from 'src/shared/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Module({
    imports: [SecurityModule, AuthModule, FileModule, TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).exclude(
            { path: 'users/login', method: RequestMethod.ALL },
            { path: 'users/register', method: RequestMethod.ALL },
            { path: 'users/photo', method: RequestMethod.ALL },
            { path: 'users/files-fields', method: RequestMethod.ALL }
        ).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        });
    }
}