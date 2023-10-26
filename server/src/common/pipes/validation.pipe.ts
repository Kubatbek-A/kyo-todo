import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';
import { set } from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type === 'custom') {
      return value;
    }

    const obj = plainToClass(metadata.metatype, value || {});
    const errors = await validate(obj, {
      enableDebugMessages: true,
      whitelist: true,
      transform: true,
    });

    if (errors.length) {
      const messages = errors.reduce((acc, cur) => {
        this.getConstraintsWithPaths(cur, cur.property).forEach((err) => {
          const error = Object.values(err.constraints)[0].split(' ');
          error.shift();
          set(acc, err.path, error.join(' '));
        });

        return acc;
      }, {});

      throw new ValidationException(messages);
    }

    return obj;
  }

  private getConstraintsWithPaths(
    err: ValidationError,
    path?: string,
  ): Array<{
    path?: string;
    constraints: {
      [type: string]: string;
    };
  }> {
    if (err.constraints) {
      return [{ path: `${path}`, constraints: err.constraints }];
    }

    return err.children.reduce((acc, cur) => {
      acc.push(
        ...this.getConstraintsWithPaths(cur, `${path || ''}.${cur.property}`),
      );
      return acc;
    }, []);
  }
}
