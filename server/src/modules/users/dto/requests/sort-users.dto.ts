import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SortAt } from 'src/common/enum/sort-at.enum';
import { UsersSortFields } from '../../enum/users-sort-fields.enum';

export class SortUsersReqDto {
  @ApiProperty({ name: 'sort[sortAt]', enum: SortAt })
  @IsEnum(SortAt)
  readonly sortAt: SortAt;

  @ApiProperty({ name: 'sort[sortBy]', enum: UsersSortFields })
  @IsEnum(UsersSortFields)
  readonly sortBy: UsersSortFields;
}
