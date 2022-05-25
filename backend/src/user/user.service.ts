import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConnectMetamaskDto, EditUserDto, UpdatePasswordDto } from './dto';
import { UserOutEntity } from './entities';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    });

    return new UserOutEntity(user);
  }

  async updatePassword(userId: number, dto: UpdatePasswordDto) {
    const oldUser = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    const pwValid = await argon.verify(oldUser.password_hash, dto.old_password);

    if (!pwValid) throw new ForbiddenException('Invalid credentials');

    const newPassword = await argon.hash(dto.password);

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        password_hash: newPassword,
      },
    });

    return new UserOutEntity(user);
  }

  async connectMetamask(userId: number, dto: ConnectMetamaskDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user.metamaskAddress && user.metamaskAddress === dto.metamaskAddress) {
      return new UserOutEntity(user);
    }
    if (user.metamaskAddress) {
      throw new ForbiddenException('Metamask address already set');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        metamaskAddress: dto.metamaskAddress,
      },
    });

    return new UserOutEntity(updatedUser);
  }
}
