import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DriverModule } from './driver/driver.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { JwtAuthModule } from './auth/jwt/jwt-auth.module';
import { AdminModule } from './admin/admin.module';
import { Driver } from './entities/driver.entity';
import { User } from './entities/user.entity';
import { Campaign } from './entities/campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'double_auth_nest',
      entities: [User, Driver, Campaign],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    DriverModule,
    JwtAuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: RolesGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
