import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { HealthModule } from './modules/health/health.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => config.database as TypeOrmModuleOptions
    }),
    HealthModule,
    TodoModule,
    UserModule
  ]
})
export class AppModule {}
