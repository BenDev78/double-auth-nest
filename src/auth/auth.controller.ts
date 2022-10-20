import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { Response } from 'express';
import { Driver } from '../entities/driver.entity';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from '../entities/user.entity';
import { SESSION_ID } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('login')
  async login(@Body() _body: Partial<CreateDriverDto>, @Res() _res: Response) {
    const { password, username } = _body;
    const driver = await Driver.findOne({
      where: { username },
    });

    if (!driver)
      throw new NotFoundException(
        `User not found with this username ${username}`,
      );

    const isPasswordValid = await bcrypt.compare(password, driver.password);

    if (!isPasswordValid) throw new BadRequestException('Password invalid');

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
