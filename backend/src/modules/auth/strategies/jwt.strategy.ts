import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

interface JwtPayload {
  sub: number;
  nombreUsuario: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const extractor = ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      jwtFromRequest: (req: Request) => extractor(req),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mi_secreto_dev',
    });
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, nombreUsuario: payload.nombreUsuario };
  }
}
