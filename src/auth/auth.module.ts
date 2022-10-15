import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { PassportModule } from '@nestjs/passport';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';

@Module({
  imports: [UserModule, PassportModule, GoogleOauthModule, JwtAuthModule]
})
export class AuthModule {}
