import { Exclude } from 'class-transformer';

export class UserOutEntity {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  blocked: boolean;

  @Exclude()
  password_hash: string;

  constructor(partial: Partial<UserOutEntity>) {
    Object.assign(this, partial);
  }
}
