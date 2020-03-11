import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService]
    }).compile();
  });

  describe('getHealth', () => {
    it('should return ', async (done: jest.DoneCallback) => {
      const healthController = app.get<HealthController>(HealthController);
      const response = await healthController.getUptime();
      expect(response).toBeInstanceOf(Object);
      expect(response).toHaveProperty('uptime');
      done();
    });
  });
});
