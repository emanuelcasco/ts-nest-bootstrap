import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService]
    }).compile();
  });

  describe('Todo::findAll', () => {
    it('should return ', async done => {
      const todoController = app.get<TodoController>(TodoController);
      const response = await todoController.findAll();
      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toHaveProperty('id');
      expect(response[0]).toHaveProperty('userId');
      expect(response[0]).toHaveProperty('title');
      expect(response[0]).toHaveProperty('completed');
      done();
    });
  });

  describe('Todo::findById', () => {
    it('should return ', async done => {
      const todoController = app.get<TodoController>(TodoController);
      const response = await todoController.findById(1);
      expect(response).toBeInstanceOf(Object);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('userId');
      expect(response).toHaveProperty('title');
      expect(response).toHaveProperty('completed');
      done();
    });
  });
});
