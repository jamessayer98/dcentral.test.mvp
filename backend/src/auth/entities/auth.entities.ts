import { UserOutEntity } from 'src/user/entities';

export class SignInEntity {
  user: UserOutEntity;
  tokens: {
    access: string;
    refresh: string;
  };

  constructor(partial: Promise<SignInEntity>) {
    Object.assign(this, partial);
  }
}
