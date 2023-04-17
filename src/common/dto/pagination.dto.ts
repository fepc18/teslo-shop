import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 10,
    description: 'The number of items to return',
    required: false,
    default: 10,
    minimum: 1,
  })
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    example: 0,
    description: 'The number of items to skip',
    required: false,
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset?: number;
}
