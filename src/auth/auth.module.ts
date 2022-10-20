import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule, GoogleOauthModule, JwtAuthModule],
  controllers: [AuthController],
})
export class AuthModule {}
