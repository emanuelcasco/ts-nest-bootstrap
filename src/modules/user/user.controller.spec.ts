import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();
  });

  describe('Todo::findMany', () => {
    it('should return ', async done => {
      const userController = app.get(UserController);
      const response = await userController.findMany();
      expect(response).toBeInstanceOf(Array);
      done();
    });
  });

  describe('Todo::findById', () => {
    it('should return ', async done => {
      const userController = app.get(UserController);
      const response = await userController.findById(1);
      expect(response).toBeInstanceOf(Object);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('userId');
      expect(response).toHaveProperty('title');
      expect(response).toHaveProperty('completed');
      done();
    });
  });
});
