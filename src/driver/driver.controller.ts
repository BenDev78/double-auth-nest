import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { DriverService } from './driver.service';
import { ADMIN_DRIVER_ITEM } from '../common/groups/driver.groups';
import { CreateDriverDto } from './dto/create-driver.dto';
import { JwtAuthService } from '../auth/jwt/jwt-auth.service';

@Controller('driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post()
  @SerializeOptions({ groups: [ADMIN_DRIVER_ITEM] })
  async create(@Body() _body: CreateDriverDto) {
    const driver = await this.driverService.create(_body);

    return this.jwtAuthService.login(driver);
  }
}
