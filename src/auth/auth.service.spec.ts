import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { Driver } from '../entities/driver.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let jwtAuthService: JwtAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, JwtAuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    jwtAuthService = module.get<JwtAuthService>(JwtAuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(jwtAuthService).toBeDefined();
  });

  describe('When login a driver', () => {
    it('should throw NotFoundException because username not match', async () => {
      const driverFindOneResult = jest
        .spyOn(Driver, 'findOne')
        .mockReturnValue(undefined);

      const accessTokenResult = authService.login({
        username: 'not-found@test.com',
        password: 'test',
      });

      expect(driverFindOneResult).toBeCalledWith({
        where: { username: 'not-found@test.com' },
      });

      await expect(accessTokenResult).rejects.toThrowError(NotFoundException);
    });

    it('should throw BadRequestException because password not match', async () => {
      const driverFindOneResult = jest
        .spyOn(Driver, 'findOne')
        .mockReturnValue(Promise.resolve(new Driver()));

      const spyCompare = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation((data, hash) => false);

      const accessTokenResult = authService.login({
        username: 'test@test.com',
        password: 'not-matched-password',
      });

      await expect(accessTokenResult).rejects.toThrowError(BadRequestException);
      expect(driverFindOneResult).toHaveBeenCalledWith({
        where: { username: 'test@test.com' },
      });
      expect(spyCompare).toHaveBeenCalled();
    });

    it('should return accessToken', async () => {
      const driverFindOneResult = jest
        .spyOn(Driver, 'findOne')
        .mockReturnValue(Promise.resolve(new Driver()));

      const spyCompare = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation((data, hash) => true);

      const spySign = jest
        .spyOn(jwtService, 'sign')
        .mockImplementation((payload, secret) => 'token');

      const accessTokenResult = await authService.login({
        username: 'test@test.com',
        password: 'test',
      });

      expect(driverFindOneResult).toBeCalledWith({
        where: { username: 'test@test.com' },
      });

      expect(accessTokenResult).toEqual({ accessToken: 'token' });
      expect(spyCompare).toHaveBeenCalled();
      expect(spySign).toHaveBeenCalled();
    });
  });
});
