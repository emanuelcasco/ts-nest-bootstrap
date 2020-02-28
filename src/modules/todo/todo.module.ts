import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

import { JwtService } from '../shared/jwt.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService, JwtService]
})
export class TodoModule {}
