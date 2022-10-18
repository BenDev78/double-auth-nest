import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { User } from '../../entities/user.entity';
import { SESSION_ID } from '../../common/constants';

@Controller('google')
export class GoogleOauthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req: Request) {
    // guard redirect
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() _req: Request, @Res() _res: Response) {
    const { accessToken } = this.jwtAuthService.login(_req.user as User);
    _res.cookie(SESSION_ID, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return _res.redirect('/');
  }
}
