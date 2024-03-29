import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guards';
import { ConnectMetamaskDto, EditUserDto, UpdatePasswordDto } from './dto';
import { SystemUser } from './interfaces';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: SystemUser) {
    return user;
  }

  @Patch()
  updateMe(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Patch('me/password')
  updatePassword(
    @GetUser('id') userId: number,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(userId, dto);
  }

  @Post('metamask/connect')
  connectMetamask(
    @GetUser('id') userId: number,
    @Body() dto: ConnectMetamaskDto,
  ) {
    return this.userService.connectMetamask(userId, dto);
  }
}
