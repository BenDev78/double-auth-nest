import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  create(user: CreateUserDto) {
    return User.save(user as User);
  }

  findOne(params: FindOneOptions<User> = {}) {
    return User.findOne(params);
  }

  findAll(params: FindManyOptions<User> = {}) {
    return User.find(params);
  }
}
