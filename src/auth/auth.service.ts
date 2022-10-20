import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { DriverService } from '../driver/driver.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly driverService: DriverService) {}

  async login(_body: CreateDriverDto) {
    const { password, username } = _body;
    const driver = await this.driverService.findOne({
      where: { username },
    });

    if (!driver)
      throw new NotFoundException(
        `User not found with this username ${username}`,
      );

    const isPasswordValid = await bcrypt.compare(password, driver.password);

    if (!isPasswordValid) throw new BadRequestException('Password invalid');

    return driver;
  }
}
