import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { TodoService, Todo } from './todo.service';
import { AuthGuard } from '../shared/auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number): Promise<Todo> {
    return this.todoService.findById(id);
  }
}
