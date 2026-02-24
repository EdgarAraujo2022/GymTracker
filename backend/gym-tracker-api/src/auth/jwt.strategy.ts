import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const authId = payload.sub;

    if (!authId) {
      throw new UnauthorizedException();
    }


    let user = await this.prisma.user.findUnique({
      where: { authId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          authId: authId,
          email: payload.email,
          role: payload[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
        },
      });
    }

    return user; // vira req.user
  }

}
