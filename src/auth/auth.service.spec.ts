import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DriverService } from '../driver/driver.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Driver } from '../entities/driver.entity';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let driverService: DriverService;
  let findOne: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        DriverService,
        { provide: getRepositoryToken(Driver), useValue: { findOne } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    driverService = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(driverService).toBeDefined();
  });

  describe('when login a driver', () => {
    describe('and username is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw error', async () => {
        await expect(
          authService.login({ username: 'test@test.com', password: 'test' }),
        ).rejects.toThrow();
      });
    });

    describe("and username matched but password doesn't", () => {
      let driver: Driver;
      beforeEach(() => {
        driver = new Driver();
        findOne.mockReturnValue(Promise.resolve(driver));
        jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
      });
      it('should throw error', async () => {
        await expect(
          authService.login({ username: 'test@test.com', password: '' }),
        ).rejects.toThrow();
      });
    });

    describe('and username and password matched', () => {
      let driver: Driver;
      beforeEach(() => {
        driver = new Driver();
        findOne.mockReturnValue(Promise.resolve(driver));
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
