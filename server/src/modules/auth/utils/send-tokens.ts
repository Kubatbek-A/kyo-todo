import { Response } from 'express';
import { setRefreshCookie } from './set-refresh-cookie';
import { AccessTokenRepresentation } from '../dto/responses/access-token.representation';
import { Tokens } from '../interfaces/tokens.interface';

export const sendTokens = (res: Response, tokens: Tokens) => {
  setRefreshCookie(res, tokens.refreshToken);
  res.json(new AccessTokenRepresentation(tokens));
};
