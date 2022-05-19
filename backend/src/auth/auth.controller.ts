import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto, SigninDto, SignupDto } from './dto';
import { GoogleTokenVerificationDto } from './dto/google-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() signupDto: SigninDto) {
    return this.authService.signin(signupDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }

  @Post('google')
  @HttpCode(HttpStatus.OK)
  google(@Body() tokenData: GoogleTokenVerificationDto) {
    return this.authService.googleAuthenticate(tokenData);
  }
}
