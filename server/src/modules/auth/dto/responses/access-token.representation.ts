import { ApiResponseProperty } from '@nestjs/swagger';
import { Tokens } from '../../interfaces/tokens.interface';

export class AccessTokenRepresentation {
  constructor(tokens: Tokens) {
    this.sign = tokens.sign;
    this.accessToken = tokens.accessToken;
    this.expiresAt = tokens.expiresAt;
  }

  @ApiResponseProperty()
  sign: string;

  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  expiresAt: Date;
}
