import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { Auth, google } from 'googleapis';
import { PrismaService } from '../prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import { GoogleTokenVerificationDto } from './dto/google-auth.dto';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const clientID = this.configService.get('GOOGLE_OAUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET');
    this.oauthClient = new google.auth.OAuth2(
      clientID,
      clientSecret,
      'postmessage',
    );
  }

  async signup(dto: SignupDto) {
    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.email.split('@')[0],
          password_hash: hashedPassword,
        },
        select: {
          email: true,
          id: true,
          firstName: true,
          lastName: true,
        },
      });

      return { user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already exists');
        }
        throw error;
      }
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const pwValid = await argon.verify(user.password_hash, dto.password);
    if (!pwValid) throw new BadRequestException('Invalid credentials');

    delete user.password_hash;

    const accessToken = await this.assignAccessToken(user.id);
    const refreshToken = await this.assignRefreshToken(user.id);

    return {
      user,
      tokens: { access: accessToken, refresh: refreshToken },
    };
  }

  async refresh(dto: { refreshToken: string }) {
    const refreshTokenSecret = this.configService.get('REFRESH_TOKEN_SECRET');

    const payload = await this.jwtService.verifyAsync(dto.refreshToken, {
      ignoreExpiration: false,
      secret: refreshTokenSecret,
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const accessToken = await this.assignAccessToken(user.id);
    const refreshToken = await this.assignRefreshToken(user.id);

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  async googleAuthenticate(tokenData: GoogleTokenVerificationDto) {
    try {
      const tokensPaylod = await this.oauthClient.getToken(tokenData.code);
      const userPayload = await this.handleGoogleLogin(tokensPaylod.tokens);
      return userPayload;
    } catch (error) {
      throw new BadRequestException('Could not login with google');
    }
  }

  private async handleGoogleLogin(tokenPayload: Auth.Credentials) {
    const tokenInfo = await this.oauthClient.verifyIdToken({
      idToken: tokenPayload.id_token,
    });
    const email = tokenInfo.getPayload().email;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
        provider: 'google',
      },
    });

    if (!user) {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          provider: 'google',
          firstName: tokenInfo.getPayload().given_name,
          lastName: tokenInfo.getPayload().family_name,
          username: tokenInfo.getPayload().email.split('@')[0],
          isVerified: tokenInfo.getPayload().email_verified,
        },
      });
      delete newUser.password_hash;

      return {
        user: newUser,
        tokens: {
          access: await this.assignAccessToken(newUser.id),
          refresh: await this.assignRefreshToken(newUser.id),
        },
      };
    }

    delete user.password_hash;
    return {
      user,
      tokens: {
        access: await this.assignAccessToken(user.id),
        refresh: await this.assignRefreshToken(user.id),
      },
    };
  }

  private async assignAccessToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    const accessTokenSecret = this.configService.get('ACCESS_TOKEN_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      secret: accessTokenSecret,
      expiresIn: '10m',
    });

    return token;
  }

  private async assignRefreshToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    const accessTokenSecret = this.configService.get('REFRESH_TOKEN_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      secret: accessTokenSecret,
      expiresIn: '7d',
    });

    return token;
  }
}
