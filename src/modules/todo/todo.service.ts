import { Injectable } from '@nestjs/common';
import axios from 'axios';

import config from '../../config';

const instance = axios.create({
  baseURL: config.todosExternalApi.baseUrl,
  responseType: 'json'
});

export interface Todo {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
}

@Injectable()
export class TodoService {
  async findAll(): Promise<Todo[]> {
    const { data: todos } = await instance.get<Todo[]>('/todos');
    return todos;
  }

  async findById(id: number): Promise<Todo> {
    const { data: todo } = await instance.get<Todo>(`/todos/${id}`);
    return todo;
  }
}
