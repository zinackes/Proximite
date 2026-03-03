import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowAnonymous()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('health/db')
  @AllowAnonymous()
  checkDb(): Promise<object> {
    return this.appService.checkDb();
  }
}
