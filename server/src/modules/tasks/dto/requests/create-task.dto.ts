import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsMilitaryTime, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: '2023-04-01' })
  @IsISO8601({ strict: true })
  @Length(10, 10)
  readonly dueDate: string;

  @ApiProperty({ example: '09:00' })
  @IsMilitaryTime()
  readonly dueTime: string;
}
