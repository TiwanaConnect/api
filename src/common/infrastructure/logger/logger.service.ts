import {
  Injectable,
  Logger,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(private readonly logger: Logger) {}

  private static _getMessageAsString(message: any): string {
    if (typeof message === 'string') {
      return message;
    } else if (message instanceof Error) {
      return JSON.stringify(message, Object.getOwnPropertyNames(message));
    } else {
      return JSON.stringify(message);
    }
  }

  debug(message: any, ...optionalParams: any[]) {
    return this.logger.debug(
      LoggerService._getMessageAsString(message),
      optionalParams,
    );
  }

  error(error: any, ...optionalParams: any[]) {
    return this.logger.error(
      LoggerService._getMessageAsString(error),
      optionalParams,
    );
  }

  info(message: any, ...optionalParams: any[]) {
    return this.log(message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    return this.logger.log(
      LoggerService._getMessageAsString(message),
      optionalParams,
    );
  }

  logErrorWithReference(error: any, customMessage?: string): string {
    const logRef = randomUUID();

    let errMessage: string;
    if (typeof error === 'string') {
      errMessage = error;
    } else if (error instanceof Error) {
      errMessage = JSON.stringify(error, Object.getOwnPropertyNames(error));
    } else {
      errMessage = JSON.stringify(error);
    }

    this.error(
      `LogRef: ${logRef} - ${customMessage ? customMessage + ': ' : ''}${errMessage}`,
    );
    return logRef;
  }

  verbose(message: any, ...optionalParams: any[]) {
    return this.logger.verbose(
      LoggerService._getMessageAsString(message),
      optionalParams,
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    return this.logger.warn(
      LoggerService._getMessageAsString(message),
      optionalParams,
    );
  }
}
