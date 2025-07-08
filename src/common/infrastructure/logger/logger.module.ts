import { Module, Logger, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [Logger, LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
