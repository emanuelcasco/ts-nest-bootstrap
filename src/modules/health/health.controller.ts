import { Controller, Get } from '@nestjs/common';
import { HealthService, Uptime } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getUptime(): Uptime {
    return this.healthService.getUptime();
  }
}
