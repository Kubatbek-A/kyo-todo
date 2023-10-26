import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from '../exceptions/validation.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error: {
      status?: number;
      message?: string;
      type?: string;
      errors?: Record<string, string>;
    } = {};

    if (exception instanceof HttpException) {
      error.status = exception.getStatus();
      error.message = exception.message;

      if (exception instanceof ValidationException) {
        error.errors = exception.errors;
      }
    } else {
      this.logger.error(exception, exception.stack);
      error.status = HttpStatus.INTERNAL_SERVER_ERROR;
      error.message = 'InternalServerError';
    }

    return response.status(error.status).json(error);
  }
}
