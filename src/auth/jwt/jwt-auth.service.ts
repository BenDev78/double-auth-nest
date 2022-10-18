import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { JwtPayload } from './jwt-auth.strategy';
import { Driver } from '../../entities/driver.entity';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../user/user.service';
import { DriverService } from '../../driver/driver.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly driverService: DriverService,
  ) {}

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
      return await this.userService.findOne({ where: { providerId: sub } });
    }

    if ('app' === provider) {
      return await this.driverService.findOne({ where: { providerId: sub } });
    }
  }
}
