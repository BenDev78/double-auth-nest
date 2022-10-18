import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles.enum';
import { ROLES_KEY } from '../decorator/role.decorator';
import { JwtAuthService } from '../../auth/jwt/jwt-auth.service';
import { SESSION_ID } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if ('undefined' === typeof requiredRoles || !requiredRoles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies[SESSION_ID];

    if (!token) {
      return false;
    }

    return this.jwtAuthService
      .getUser(request.cookies[SESSION_ID])
      .then((res) => {
        return requiredRoles.some((role) => res?.roles?.includes(role));
      });
  }
}
