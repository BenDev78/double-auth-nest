import { Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { GoogleOauthController } from './google-oauth.controller';
import { JwtAuthModule } from '../jwt/jwt-auth.module';

@Module({
  imports: [UserModule, JwtAuthModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
