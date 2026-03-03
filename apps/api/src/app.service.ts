import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER) private cache: Cache) {}

  async getHello(): Promise<string> {
    const cached = await this.cache.get<string>("test");
    if(cached){
      return cached;
    }

    await this.cache.set("test", "Hello World !", 30000);
    return 'Hello World!';
  }

  async checkDb(): Promise<object> {
    const result = await this.dataSource.query('SELECT version(), current_database(), now()');
    return result[0];
  }
}
