import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkDb(): Promise<object> {
    const result = await this.dataSource.query('SELECT version(), current_database(), now()');
    return result[0];
  }
}
