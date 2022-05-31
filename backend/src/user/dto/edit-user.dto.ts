import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
