import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNumber,
  IsOptional,
  IsPositive,
  IsArray,
  IsIn,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Nike Air Max 270',
    description: 'The title of the product',
    uniqueItems: true,
    minLength: 1,
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the product',
    nullable: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'The description of the product',
    default: null,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'nike_air_max_270',
    description: 'The slug of the product',
    uniqueItems: true,
    nullable: true
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 10,
    description: 'The stock of the product',
    default: 0,
    nullable: true
  })

  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'The sizes of the product',
    nullable: false
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    example:'women'
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}
