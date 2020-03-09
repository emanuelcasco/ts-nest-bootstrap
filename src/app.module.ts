import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { HttpErrorFilter } from './core/shared/filters';
import { LoggingInterceptor } from './core/shared/interceptors';

import { HealthModule } from './core/health/health.module';
import { ProductModule } from './core/product/product.module';
import { CategoryModule } from './core/category/category.module';
import { ListModule } from './core/list/list.module';
import { TodoModule } from './core/todo/todo.module';
import { UserModule } from './core/user/user.module';

import databaseConfig from './config/db';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql'
    }),
    CategoryModule,
    ProductModule,
    HealthModule,
    TodoModule,
    ListModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
