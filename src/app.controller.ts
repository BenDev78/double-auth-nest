import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CurrentUser } from './auth/decorator/current-user.decorator';
import { Roles } from './common/decorator/role.decorator';
import { Role } from './common/roles.enum';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  home(@Req() _req: Request, @CurrentUser() user: Partial<User>) {
    return user;
  }
}
