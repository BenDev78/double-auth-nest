import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { JwtPayload } from './jwt-auth.strategy';
import { Driver } from '../../entities/driver.entity';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: User | Driver) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.providerId,
      provider: user.provider,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getUser(token) {
    const decoded: JwtPayload = jwt_decode(token);
    const { provider, sub } = decoded;

    if ('google' === provider) {
      return await User.findOne({ where: { providerId: sub } });
    }

    if ('app' === provider) {
      return await Driver.findOne({ where: { providerId: sub } });
    }
  }
}
