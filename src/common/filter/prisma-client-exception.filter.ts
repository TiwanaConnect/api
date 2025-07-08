import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { WorkDone } from '../dto';
import { HttpStatus } from '@nestjs/common';

interface HttpErrorResponse {
  statusCode: HttpStatus;
  message: string;
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const model = (exception.meta as any)?.modelName ?? 'record';
    const errorResponse = this.createErrorResponse(exception, model);

    return response
      .status(errorResponse.statusCode)
      .json(WorkDone.buildError(errorResponse.message));
  }

  private createErrorResponse(
    exception: Prisma.PrismaClientKnownRequestError,
    model: string,
  ): HttpErrorResponse {
    let target: string[] = [];
    switch (exception.code) {
      case 'P2002':
        target = (exception.meta as { target: string[] })?.target ?? [];
        return {
          statusCode: HttpStatus.CONFLICT,
          message: `${model}: Unique constraint failed on ${target.join(', ')}`,
        };
      case 'P2025':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `${model} not found`,
        };
      case 'P2003':
        return {
          statusCode: HttpStatus.CONFLICT,
          message: `${model}: Foreign key constraint failed`,
        };
      default:
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `${model}: ${exception.message}`,
        };
    }
  }
}
