import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../entities/driver.entity';
import { JwtAuthService } from '../auth/jwt/jwt-auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriverService, JwtAuthService, JwtService],
  controllers: [DriverController],
  exports: [DriverService],
})
export class DriverModule {}
