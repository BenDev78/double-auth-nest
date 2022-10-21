import { Module } from '@nestjs/common';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from '../interceptor/current-user.interceptor';
import { UserModule } from '../../user/user.module';
import { DriverModule } from '../../driver/driver.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: 'secret',
          signOptions: {
            expiresIn: '15s',
          },
        };
      },
    }),
    UserModule,
    DriverModule,
  ],
  providers: [
    JwtAuthStrategy,
    JwtAuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    JwtService,
  ],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
