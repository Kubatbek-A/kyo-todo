import { Request } from 'express';
import { User } from 'src/modules/users/entities/user.entity';

export type IAuthUser = Request & { user: User };
