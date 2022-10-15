import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { SESSION_ID } from '../../common/constants';
import jwt_decode from 'jwt-decode';

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

    request.currentUser = jwt_decode(token);

    return next.handle();
  }
}
