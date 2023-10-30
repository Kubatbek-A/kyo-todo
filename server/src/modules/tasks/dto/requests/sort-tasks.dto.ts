import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TasksSortFields } from '../../enums/tasks-sort-fields.enum';
import { SortAt } from '../../../../common/enum/sort-at.enum';

export class SortTasksDto {
  @ApiProperty({ name: 'sort[sortBy]', enum: TasksSortFields })
  @IsEnum(TasksSortFields)
  readonly sortBy: boolean;

  @ApiProperty({ name: 'sort[sortAt]', enum: SortAt })
  @IsEnum(SortAt)
  readonly sortAt: SortAt;
}
