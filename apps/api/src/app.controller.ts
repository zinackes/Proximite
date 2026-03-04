import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';



const testSchema = z.object({
  test: z.string()
});

class TestDto extends createZodDto(testSchema){}

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
  checkDb(@Body() test: TestDto): Promise<object> {
    return this.appService.checkDb();
  }
}
