import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as PassportJWTStrategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SystemUser } from 'src/user/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJWTStrategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any): Promise<SystemUser> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) return null;

    delete user.password_hash;
    return user;
  }
}
