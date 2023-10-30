import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
} from 'class-validator';
import { TaskStatus } from '../../enums/task-status.enum';

export class FilterTasksDto {
  @ApiPropertyOptional({ name: 'filter[search]' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly search?: string;

  @ApiPropertyOptional({
    name: 'filter[dueDate]',
    example: '2023-04-01',
  })
  @IsOptional()
  @IsISO8601({ strict: true })
  readonly dueDate?: string;

  @ApiPropertyOptional({ name: 'filter[status]', enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;
}
