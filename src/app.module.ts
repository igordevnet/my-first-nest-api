import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './shared/auth/auth.module';
import { SecurityModule } from './shared/security/security.module';

@Module({
  imports: [UserModule, AuthModule, SecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
