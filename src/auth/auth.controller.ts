import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { Response } from 'express';
import { Driver, ADMIN_DRIVER_ITEM } from '../entities/driver.entity';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from '../entities/user.entity';
import { SESSION_ID } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { DriverService } from '../driver/driver.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly driverService: DriverService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('register')
  @SerializeOptions({ groups: [ADMIN_DRIVER_ITEM] })
  async register(
    @Body() _body: CreateDriverDto,
    @Res({ passthrough: true }) _res: Response,
  ): Promise<Driver> {
    const driver = await this.driverService.create(_body);

    const { accessToken } = this.jwtAuthService.login(driver);

    _res.cookie(SESSION_ID, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return driver;
  }

  @Post('login')
  async login(@Body() _body: CreateDriverDto, @Res() _res: Response) {
    const driver = await this.authService.login(_body);
    const { accessToken } = this.jwtAuthService.login(driver);

    _res.cookie(SESSION_ID, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return _res.redirect('/');
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  currentUser(@CurrentUser() currentUser: User | Driver) {
    return currentUser;
  }
}
