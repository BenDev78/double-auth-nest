import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DriverService } from '../driver/driver.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Driver } from '../entities/driver.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        DriverService,
        { provide: getRepositoryToken(Driver), useValue: {} },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('when login a driver', () => {
    describe('and username is not matched', () => {
      beforeEach(() => {
        jest.spyOn(Driver, 'findOne').mockReturnValue(undefined);
      });
      it('should throw error', async () => {
        await expect(
          authService.login({ username: 'test@test.com', password: 'test' }),
        ).rejects.toThrowError(NotFoundException);
      });
    });

    describe("and username matched but password doesn't", () => {
      let driver: Driver;
      beforeEach(() => {
        driver = new Driver();
        jest.spyOn(Driver, 'findOne').mockReturnValue(Promise.resolve(driver));
        jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
      });
      it('should throw error', async () => {
        await expect(
          authService.login({ username: 'test@test.com', password: '' }),
        ).rejects.toThrowError(BadRequestException);
      });
    });

    describe('and username and password matched', () => {
      let driver: Driver;
      beforeEach(() => {
        driver = new Driver();
        jest.spyOn(Driver, 'findOne').mockReturnValue(Promise.resolve(driver));
        jest.spyOn(bcrypt, 'compare').mockReturnValue(true);
      });
      it('should return user', () => {
        const loggedDriver = authService.login({
          username: 'test@test.com',
          password: 'test',
        });
        expect(loggedDriver).toEqual(Promise.resolve(driver));
      });
    });
  });
});
