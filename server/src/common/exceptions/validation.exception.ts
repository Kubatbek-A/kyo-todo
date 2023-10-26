import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  errors: { [key: string]: string };

  constructor(errors: { [key: string]: string }, status?: number) {
    super(errors, status || HttpStatus.BAD_REQUEST);
    this.errors = errors;
  }
}
