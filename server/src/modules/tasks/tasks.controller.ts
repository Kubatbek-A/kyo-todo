import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/requests/create-task.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TaskRepresentationDto } from './dto/representation/task.representation';
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator';
import { PaginationReqDto } from '../../common/dto/pagination.dto';
import { PaginatedDto } from '../../common/dto/paginated.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { FilterTasksDto } from './dto/requests/filter-tasks.dto';
import { SortTasksDto } from './dto/requests/sort-tasks.dto';
import { UpdateTaskDto } from './dto/requests/update-task.dto';
import { TasksService } from './tasks.service';
import { ReqUser } from '../auth/req-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get tasks' })
  @ApiPaginatedResponse(TaskRepresentationDto)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getTasks(
    @Query('page') page: PaginationReqDto,
    @Query('filter') filter: FilterTasksDto,
    @Query('sort') sort: SortTasksDto,
    @ReqUser() user: User,
  ) {
    const [tasks, total] = await this.tasksService.findAll(
      page,
      filter,
      sort,
      user,
    );

    return new PaginatedDto(
      tasks.map((task) => new TaskRepresentationDto(task)),
      new PageMetaDto(page, total),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ type: TaskRepresentationDto })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskRepresentationDto> {
    const task = await this.tasksService.updateTask(id, updateTaskDto);
    return new TaskRepresentationDto(task);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete a task' })
  @ApiOkResponse({ type: TaskRepresentationDto })
  async complete(@Param('id') id: string) {
    await this.tasksService.complete(id);
    return { result: 'OK' };
  }

  @Patch(':id/todo')
  @ApiOperation({ summary: 'Make task status todo' })
  @ApiOkResponse({ type: TaskRepresentationDto })
  async todo(@Param('id') id: string) {
    await this.tasksService.todo(id);
    return { result: 'OK' };
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiOkResponse({
    type: () => TaskRepresentationDto,
    description: 'Created a task',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateTaskDto, @ReqUser() user: User) {
    return this.tasksService.create(dto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiOkResponse({ type: () => TaskRepresentationDto })
  async getById(@Param('id') id: string) {
    const task = await this.tasksService.getById(id);
    return new TaskRepresentationDto(task);
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiOkResponse({ description: 'Task has been deleted' })
  async deleteTask(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
    return { result: 'OK' };
  }
}
