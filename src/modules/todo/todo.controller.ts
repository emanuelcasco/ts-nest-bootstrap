import { Controller, Get, Param } from '@nestjs/common';
import { TodoService, Todo } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number): Promise<Todo> {
    return this.todoService.findById(id);
  }
}
