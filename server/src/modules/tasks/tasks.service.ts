import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/requests/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Transactional } from 'typeorm-transactional';
import {
  Brackets,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { PaginationReqDto } from '../../common/dto/pagination.dto';
import { FilterTasksDto } from './dto/requests/filter-tasks.dto';
import { SortTasksDto } from './dto/requests/sort-tasks.dto';
import { TaskStatus } from './enums/task-status.enum';
import { UpdateTaskDto } from './dto/requests/update-task.dto';
import { setFieldIfExists } from 'src/common/utils/set-field-if-exists';
import { User } from '../users/entities/user.entity';
import { Collaborator } from './entities/collaborator.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
  ) {}

  async findOneOrFail(
    where: FindOptionsWhere<Task>,
    relations?: FindOptionsRelations<Task>,
  ) {
    const task = await this.taskRepository.findOne({
      where,
      relations,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Transactional()
  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOneOrFail({ id });

    setFieldIfExists(task, 'title', dto.title);
    setFieldIfExists(task, 'dueDate', dto.dueDate);
    setFieldIfExists(task, 'description', dto.description);

    return this.taskRepository.save(task);
  }

  @Transactional()
  async create(dto: CreateTaskDto, user: User) {
    const dueDate = new Date(`${dto.dueDate}T${dto.dueTime}:00+06:00`);

    const task = await this.taskRepository.save({
      title: dto.title,
      dueDate: dueDate.toISOString(),
    });

    const collaborator = new Collaborator();
    collaborator.taskId = task.id;
    collaborator.userId = user.id;
    await this.collaboratorRepository.save(collaborator);

    return task;
  }

  findAll(
    page: PaginationReqDto,
    filter: FilterTasksDto,
    sort: SortTasksDto,
    user: User,
  ) {
    const query = this.taskRepository
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.collaborators', 'collaborators')
      .leftJoinAndSelect('collaborators.users', 'users')
      .orderBy(`tasks.${sort.sortBy}`, sort.sortAt);

    if (page.limit) {
      query.skip(page.skip).take(page.limit);
    }

    if (filter.status) {
      query.andWhere(`tasks.status = :status`, { status: filter.status });
    }

    if (filter.dueDate) {
      query.andWhere(`DATE(tasks.dueDate) = :dueDate`, {
        dueDate: filter.dueDate,
      });
    }

    if (filter.search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('tasks.title::text ILIKE :search', {
            search: `%${filter.search}%`,
          });
        }),
      );
    }

    query.andWhere(
      new Brackets((qb) => {
        qb.where('collaborators.userId = :userId', {
          userId: user.id,
        });
      }),
    );

    return query.getManyAndCount();
  }

  async getById(id: string): Promise<Task> {
    const task = await this.findOneOrFail({ id });

    return task;
  }

  async complete(id: string): Promise<void> {
    await this.taskRepository.update(id, { status: TaskStatus.COMPLETED });
  }

  async todo(id: string): Promise<void> {
    await this.taskRepository.update(id, { status: TaskStatus.TODO });
  }

  async deleteTask(id: string) {
    await this.taskRepository.softDelete(id);
  }
}
