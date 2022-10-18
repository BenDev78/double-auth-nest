import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { SESSION_ID } from '../../common/constants';
import jwt_decode from 'jwt-decode';
import { JwtPayload } from '../jwt/jwt-auth.strategy';
import { DriverService } from '../../driver/driver.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UserService,
    private readonly driverService: DriverService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies[SESSION_ID];

    if (!token) {
      return next.handle();
    }

    const decoded: JwtPayload = jwt_decode(token);

    const getUser = async ({ provider, sub }) => {
      if ('google' === provider) {
        return await this.userService.findOne({ where: { providerId: sub } });
      }

      if ('app' === provider) {
        return await this.driverService.findOne({ where: { providerId: sub } });
      }
    };

    request.currentUser = getUser(decoded);

    return next.handle();
  }
}
