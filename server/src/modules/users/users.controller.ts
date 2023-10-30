import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ReqUser } from '../auth/req-user.decorator';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationReqDto } from 'src/common/dto/pagination.dto';
import { FilterUsersReqDto } from './dto/requests/filter-users.dto';
import { SortUsersReqDto } from './dto/requests/sort-users.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { UserRepresentation } from './dto/representations/user.representation';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(PageMetaDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my profile' })
  @ApiOkResponse({ type: () => UserRepresentation })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findMe(@ReqUser() user: User) {
    return new UserRepresentation(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiPaginatedResponse(UserRepresentation)
  async findAll(
    @Query('page') page: PaginationReqDto,
    @Query('filter') filter: FilterUsersReqDto,
    @Query('sort') sort: SortUsersReqDto,
  ) {
    const [users, total] = await this.usersService.findAll(page, filter, sort);

    return new PaginatedDto(
      users.map((user) => new UserRepresentation(user)),
      new PageMetaDto(page, total),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: () => UserRepresentation })
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findOneOrFail({ id });

    return new UserRepresentation(user);
  }
}
