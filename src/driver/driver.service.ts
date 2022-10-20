import { BadRequestException, Injectable } from '@nestjs/common';
import { Driver } from '../entities/driver.entity';
import { BaseEntity } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DriverService extends BaseEntity {
  async create(body: CreateDriverDto) {
    const driver = await Driver.findOne({ where: { username: body.username } });

    if (driver)
      throw new BadRequestException(
        'An account with this username is already registered',
      );

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(body.password, salt);
    const newDriver = Driver.create({
      username: body.username,
      provider: 'app',
      providerId: uuidv4(),
      password: hash,
      roles: ['ROLE_USER'],
    });

    return Driver.save(newDriver, { reload: true });
  }
}
