import {
  Body,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { Driver } from '../entities/driver.entity';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { DRIVER_ITEM } from '../common/groups/driver.groups';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() _body: CreateDriverDto) {
    return await this.authService.login(_body);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @SerializeOptions({ groups: [DRIVER_ITEM] })
  currentUser(@CurrentUser() currentUser: User | Driver) {
    return currentUser;
  }
}
