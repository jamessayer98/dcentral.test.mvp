import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleTokenVerificationDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
