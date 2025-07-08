import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from './common/infrastructure';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { IHealthChecks } from './common/interface';
// import { Public } from 'src/auth/decorator';

@Controller('monitoring')
@ApiTags('Monitoring Système')
export class AppController {
  private readonly healthChecks: IHealthChecks;

  constructor(
    configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {
    this.healthChecks = configService.get<IHealthChecks>('healthChecks')!;
  }

  @Get('/health')
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    this.logger.info('Running Health checks...');
    return this.health.check([
      async () =>
        this.memory.checkHeap(
          'memory_heap',
          this.healthChecks.maxMemoryHeapInMo * 1024 * 1024,
        ),
      async () =>
        this.memory.checkRSS(
          'memory_rss',
          this.healthChecks.maxMemoryRSSInMo * 1024 * 1024,
        ),
    ]);
  }
}
