import { Body, Controller, Post, Res, SerializeOptions } from '@nestjs/common';
import { DriverService } from './driver.service';
import { ADMIN_DRIVER_ITEM } from '../common/groups/driver.groups';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Response } from 'express';
import { Driver } from '../entities/driver.entity';
import { SESSION_ID } from '../common/constants';
import { JwtAuthService } from '../auth/jwt/jwt-auth.service';

@Controller('driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post()
  @SerializeOptions({ groups: [ADMIN_DRIVER_ITEM] })
  async create(
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
}
