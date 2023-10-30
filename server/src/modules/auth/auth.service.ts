import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { Transactional } from 'typeorm-transactional';
import { OAuthUser } from './interfaces/oauth-user';
import { Tokens } from './interfaces/tokens.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokensDto } from './dto/requests/refresh-tokens.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokensRepository: Repository<RefreshToken>,
  ) {}

  @Transactional()
  async googleLogin(oAuthUser: OAuthUser, ip: string, ua: string) {
    if (!oAuthUser?.isVerified) {
      throw new BadRequestException('Unverified user');
    }

    const user = await this.usersRepository.findOneBy({
      googleId: oAuthUser.id,
    });

    if (user) {
      return this.validateAndLogin(user, ip, ua);
    }

    const newUser = await this.registerUserWithOAuth(oAuthUser);
    await this.usersRepository.update(newUser.id, { googleId: oAuthUser.id });

    return this.generateJwt(newUser, ip, ua);
  }

  private async registerUserWithOAuth({ email, name }: OAuthUser) {
    return this.usersRepository.save({
      name,
      email,
    });
  }

  async refreshTokens(req: Request, dto: RefreshTokensDto) {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new UnauthorizedException('Missing refresh token');
    }

    const refreshToken = await this.refreshTokensRepository.findOne({
      where: { id: token },
      relations: { user: true },
    });

    await this.refreshTokensRepository.delete(token);

    if (
      !refreshToken ||
      (refreshToken.fingerprint && refreshToken.fingerprint !== dto.fingerprint)
    ) {
      throw new UnauthorizedException();
    }

    return this.generateJwt(
      refreshToken.user,
      req.ip,
      req.headers['user-agent'],
      dto.fingerprint,
    );
  }

  async generateJwt(
    { id, controlToken, email }: User,
    ip: string,
    ua: string,
    fingerprint?: string,
  ): Promise<Tokens> {
    const payload = { id, controlToken, email };
    const refreshExpiresAt = new Date();
    refreshExpiresAt.setSeconds(
      refreshExpiresAt.getSeconds() +
        Number(process.env.JWT_REFRESH_EXPIRES_IN),
    );

    const accessExpiresAt = new Date();
    accessExpiresAt.setSeconds(
      accessExpiresAt.getSeconds() + Number(process.env.JWT_ACCESS_EXPIRES_IN),
    );

    const refreshToken = await this.refreshTokensRepository.save({
      expiresAt: refreshExpiresAt,
      ip,
      ua,
      userId: id,
      fingerprint,
    });

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: +process.env.JWT_ACCESS_EXPIRES_IN,
      }),
      refreshToken: refreshToken.id,
      sign: refreshToken.sign,
      expiresAt: accessExpiresAt,
    };
  }

  private validateAndLogin(
    user: User,
    ip: string,
    ua: string,
    fingerprint?: string,
  ) {
    return this.generateJwt(user, ip, ua, fingerprint);
  }
}
