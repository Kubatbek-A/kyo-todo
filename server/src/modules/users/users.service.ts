import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationReqDto } from 'src/common/dto/pagination.dto';
import { FilterUsersReqDto } from './dto/requests/filter-users.dto';
import { SortUsersReqDto } from './dto/requests/sort-users.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(
    page: PaginationReqDto,
    filter: FilterUsersReqDto,
    sort: SortUsersReqDto,
  ) {
    const query = this.usersRepository
      .createQueryBuilder('users')
      .orderBy(`users.${sort.sortBy}`, sort.sortAt);

    if (filter.search) {
      query.andWhere(`users.email ILIKE :search`, {
        search: `%${filter.search}%`,
      });
    }

    if (page.limit) {
      query.skip(page.skip).take(page.limit);
    }

    return query.getManyAndCount();
  }

  async findOne(
    where: FindOptionsWhere<User>,
    relations?: FindOptionsRelations<User>,
  ) {
    return this.usersRepository.findOne({ where, relations });
  }

  async findOneOrFail(
    where: FindOptionsWhere<User>,
    relations?: FindOptionsRelations<User>,
  ) {
    const user = await this.findOne(where, relations);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
