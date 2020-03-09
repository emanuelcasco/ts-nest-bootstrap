import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { HttpErrorFilter } from './modules/shared/filters';
import { LoggingInterceptor } from './modules/shared/interceptors';

import { HealthModule } from './modules/health/health.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { ListModule } from './modules/list/list.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';

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
