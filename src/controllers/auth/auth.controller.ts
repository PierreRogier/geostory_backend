import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@services';
import { UserLocalAuthGuard, UserJwtAuthGuard } from '@guards';
import { RequestWithUser } from '@core/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(UserLocalAuthGuard)
  @Post('login')
  loginUser(@Req() req: RequestWithUser) {
    const user = req.user;
    const cookie = this.authService.getUserCookieWithJwtToken(user.id);
    req.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(UserJwtAuthGuard)
  @Post('logout')
  logout(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    res.sendStatus(200);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('authenticate')
  authenticateSuperUser(@Req() req: RequestWithUser) {
    return req.user;
  }
}
