import { Module } from "@nestjs/common";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthService } from "./jwt-auth.service";

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
    })
  ],
  providers: [JwtAuthStrategy, JwtAuthService],
  exports: [JwtAuthService]
})
export class JwtAuthModule {}
