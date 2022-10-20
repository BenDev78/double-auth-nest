import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as mock from 'node-mocks-http';
import { User } from './entities/user.entity';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('root', () => {
    it('should return CurrentUser', () => {
      const user: Partial<User> = {
        provider: 'google',
        providerId: 'provider-id',
        username: 'toto',
        roles: ['ROLE_USER'],
      };

      const request = mock.createRequest();

      expect(appController.home(request, user)).toBe(user);
    });
  });
});
