import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class NewUserInput {
  @ApiProperty({
    example: '*******',
  })
  @IsString()
  password: string;

  @ApiProperty({
    format: 'email',
    example: 'betty@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Betty',
  })
  username: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '*******',
  })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;
}
