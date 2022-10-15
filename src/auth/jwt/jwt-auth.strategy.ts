import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { SESSION_ID } from '../../common/constants';

export type JwtPayload = { sub: string; username: string; provider: string };

export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const extractJwtFromCookie = (req) => {
      let token = null;

      if (req && req.cookies) {
        token = req.cookies[SESSION_ID];
      }

      return token;
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}
