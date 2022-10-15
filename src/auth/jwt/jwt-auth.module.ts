import { Module } from "@nestjs/common";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthService } from "./jwt-auth.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CurrentUserInterceptor } from "../interceptor/current-user.interceptor";
import { UserModule } from "../../user/user.module";
import { UserService } from "../../user/user.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: 'secret',
          signOptions: {
            expiresIn: 10000
          }
        }
      }
    }),
    UserModule
  ],
  providers: [
    JwtAuthStrategy,
    JwtAuthService,
      {
        provide: APP_INTERCEPTOR,
        useClass: CurrentUserInterceptor,
      }
  ],
  exports: [JwtAuthService]
})
export class JwtAuthModule {}
