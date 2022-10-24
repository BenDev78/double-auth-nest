import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { extractJwtFromHeaders } from '../../utils/jwt';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = extractJwtFromHeaders(request);

    if (!token) {
      return next.handle();
    }

    request.currentUser = this.jwtAuthService.getUser(token);

    return next.handle();
  }
}
