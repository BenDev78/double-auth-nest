import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { UserService } from "../../user/user.service";

config();

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly userService: UserService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    const { id, name, emails } = profile;

    let user = await this.userService.findone({
      where: {provider: 'google', providerId: id}
    });

    if (!user) {
      user = await this.userService.create({
        username: emails[0].value,
        name: name.givenName + name.familyName,
        provider: 'google',
        providerId: id,
      });
    }

    return user;
  }
}
