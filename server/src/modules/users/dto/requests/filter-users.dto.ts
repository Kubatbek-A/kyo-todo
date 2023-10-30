import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterUsersReqDto {
  @ApiPropertyOptional({ name: 'filter[search]' })
  @IsOptional()
  @IsString()
  readonly search?: string;
}
