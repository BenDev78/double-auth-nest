import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.entity';
import { JwtPayload } from './jwt-auth.strategy';
import { Driver } from '../../driver/driver.entity';

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
}
