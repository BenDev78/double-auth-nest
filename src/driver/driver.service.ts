import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../entities/driver.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async create(body: CreateDriverDto) {
    const driver = await this.findOne({ where: { username: body.username } });

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

    return newDriver.save({ reload: true });
  }

  findOne(params: FindOneOptions<Driver> = {}) {
    return Driver.findOne(params);
  }
}
