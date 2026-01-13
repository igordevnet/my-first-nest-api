import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SecurityModule } from "src/shared/security/security.module";
import { UserModule } from "src/core/user/user.module";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [SecurityModule,
    PrismaModule,
    forwardRef(() => UserModule),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { } 