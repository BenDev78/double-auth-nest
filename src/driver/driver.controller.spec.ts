import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { JwtAuthService } from '../auth/jwt/jwt-auth.service';
import { DriverService } from './driver.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('DriverController', () => {
  let controller: DriverController;
  let jwtAuthService: JwtAuthService;
  let driverService: DriverService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [DriverController],
      providers: [JwtAuthService, DriverService],
    }).compile();

    controller = module.get<DriverController>(DriverController);
    jwtAuthService = module.get<JwtAuthService>(JwtAuthService);
    driverService = module.get<DriverService>(DriverService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(jwtAuthService).toBeDefined();
    expect(driverService).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
