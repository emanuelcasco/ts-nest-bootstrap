import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthModule } from './modules/health/health.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import databaseConfig from './config/db';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig
    }),
    HealthModule,
    TodoModule,
    UserModule
  ]
})
export class AppModule {}
