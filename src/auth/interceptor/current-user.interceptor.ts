import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { SESSION_ID } from '../../common/constants';
import jwt_decode from 'jwt-decode';
import { JwtPayload } from "../jwt/jwt-auth.strategy";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies[SESSION_ID];

    if (!token) {
      return null;
    }
    const decoded: JwtPayload = jwt_decode(token);

    let user = null;

    const getUser = async ({sub}) => {
      return await this.userService.findOne({where: {providerId: sub}})
    }

    switch (decoded.provider) {
      case 'google': {
        user = getUser(decoded)

        break;
      }
      default:
        return user;
    }

    request.currentUser = user;

    return next.handle();
  }
}
