import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { DriverModule } from '../driver/driver.module';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    GoogleOauthModule,
    JwtAuthModule,
    DriverModule,
  ],
  controllers: [AuthController],
  providers: [JwtAuthService, JwtService, AuthService],
})
export class AuthModule {}
