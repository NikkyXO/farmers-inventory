import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, Min } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class CreateProductInventoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      'Welcome to the inventory application!  You can start adding inventories.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @ApiProperty()
  @IsNotEmpty()
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
