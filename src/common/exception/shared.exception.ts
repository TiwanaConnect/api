import { HttpException, HttpStatus } from '@nestjs/common';
import { EMAIL_NOT_SENT } from '../constant';

export class SecurityException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
    this.name = 'SecurityException';
  }
}

export class EmailSendFailureException extends HttpException {
  constructor(message = EMAIL_NOT_SENT) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE); // 503 status code
    this.name = 'EmailSendFailureException';
  }
}
