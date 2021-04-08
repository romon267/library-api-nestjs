import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly abonnement?: boolean;
}
