import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import * as bcrypt from 'bcrypt';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class AuthService {
  async login(_body: CreateDriverDto) {
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

    return driver;
  }
}
