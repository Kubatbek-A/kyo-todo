import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';
import { Collaborator } from 'src/modules/tasks/entities/collaborator.entity';

export class UserRepresentation {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.collaboratingTasks = user.collaboratingTasks;
    this.deletedAt = user.deletedAt;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
  }

  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty({ type: () => [Collaborator] })
  collaboratingTasks: Collaborator[];

  @ApiResponseProperty()
  deletedAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  createdAt: Date;
}
