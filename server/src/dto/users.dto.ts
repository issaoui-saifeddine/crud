import { IsEmail, IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Type(() => Number)  // Convertit la chaîne en nombre
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  country: string;
}
