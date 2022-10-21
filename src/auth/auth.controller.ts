import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Res,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { Response } from 'express';
import { Driver } from '../entities/driver.entity';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from '../entities/user.entity';
import { DriverService } from '../driver/driver.service';
import { SESSION_ID } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly driverService: DriverService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() _body: CreateDriverDto, @Res() _res: Response) {
    const { accessToken } = await this.authService.login(_body);

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
