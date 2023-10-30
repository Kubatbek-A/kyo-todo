import {
  Controller,
  Get,
  UseGuards,
  Res,
  Logger,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { ReqUser } from './req-user.decorator';
import { OAuthUser } from './interfaces/oauth-user';
import { setRefreshCookie } from './utils/set-refresh-cookie';
import { AccessTokenRepresentation } from './dto/responses/access-token.representation';
import { RefreshTokensDto } from './dto/requests/refresh-tokens.dto';
import { sendTokens } from './utils/send-tokens';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @ReqUser() user: OAuthUser,
    @Req() { ip, headers: { 'user-agent': ua } }: Request,
    @Res() res: Response,
  ) {
    try {
      const { refreshToken, sign } = await this.authService.googleLogin(
        user,
        ip,
        ua,
      );
      setRefreshCookie(res, refreshToken);

      return res.redirect(`${process.env.OAUTH_SUCCESS_URL}?sign=${sign}`);
    } catch (err) {
      Logger.error({ func: this.googleAuthRedirect.name, err });
      res.redirect(`${process.env.OAUTH_REJECT_URL}?error=${err.message}`);
    }
  }

  @Post('refresh-tokens')
  @ApiOperation({ summary: 'Refresh JWT' })
  @ApiOkResponse({ type: () => AccessTokenRepresentation })
  async refreshTokens(
    @Body() dto: RefreshTokensDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(req, dto);
    sendTokens(res, tokens);
  }
}
