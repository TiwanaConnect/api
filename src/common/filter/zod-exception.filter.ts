import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { z } from 'zod';
import { WorkDone } from '../dto';
import { HttpStatus } from '@nestjs/common';

export interface HttpErrorResponse {
  statusCode: HttpStatus;
  message: string;
}
@Catch(z.ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: z.ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = this.createErrorResponse(exception);

    return response
      .status(errorResponse.statusCode)
      .json(WorkDone.buildError(errorResponse.message));
  }

  private createErrorResponse(exception: z.ZodError): HttpErrorResponse {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', '),
    };
  }
}
