import { Controller, Get } from '@nestjs/common';
import { AppService } from '@services';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  sayHi() {
    return this.appService.sayHi();
  }
}
