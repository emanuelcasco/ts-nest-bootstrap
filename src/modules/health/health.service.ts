import { Injectable } from '@nestjs/common';

export interface Uptime {
  uptime: number;
}

@Injectable()
export class HealthService {
  getUptime(): Uptime {
    return { uptime: process.uptime() };
  }
}
