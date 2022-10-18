import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    return this.userRepository.save(user as User);
  }

  findOne(params: FindOneOptions<User> = {}) {
    return this.userRepository.findOne(params);
  }

  findAll(params: FindManyOptions<User> = {}) {
    return this.userRepository.find(params);
  }
}
