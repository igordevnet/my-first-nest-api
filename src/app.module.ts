import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './shared/auth/auth.module';
import { SecurityModule } from './shared/security/security.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/auth/guards/auth.guard';

@Module({
  imports: [UserModule, AuthModule, SecurityModule],
  controllers: [AppController],
  providers: [AppService,  {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
})
export class AppModule {}
