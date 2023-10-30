import { ApiResponseProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../enums/task-status.enum';
import { Task } from '../../entities/task.entity';
import { Collaborator } from '../../entities/collaborator.entity';

export class TaskRepresentationDto {
  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.dueDate = task.dueDate;
    this.status = task.status;
    this.description = task.description;
    this.collaborators = task.collaborators;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }

  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  dueDate: Date;

  @ApiResponseProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty({ type: () => [Collaborator] })
  collaborators: Collaborator[];

  @ApiResponseProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiResponseProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;
}
