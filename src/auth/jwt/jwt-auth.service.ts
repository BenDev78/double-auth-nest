import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.entity';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: User) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      provider: user.provider,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
