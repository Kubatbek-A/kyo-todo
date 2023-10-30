import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Collaborator } from '../tasks/entities/collaborator.entity';
import { Task } from '../tasks/entities/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Collaborator, Task])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
