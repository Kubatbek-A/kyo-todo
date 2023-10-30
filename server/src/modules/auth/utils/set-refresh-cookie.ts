import { Response } from 'express';

export const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    domain: '.' + process.env.APP_DOMAIN,
    path: '/api/auth',
    maxAge: +process.env.JWT_REFRESH_EXPIRES_IN * 1000,
    secure: true,
    sameSite: 'none',
  });
};
