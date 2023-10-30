import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageMetaDto } from '../dto/page-meta.dto';

export const ApiPaginatedResponse = <TModel extends Type<unknown>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        required: ['data'],
        properties: {
          data: {
            type: 'array',
            items: {
              oneOf: [{ $ref: getSchemaPath(model) }],
            },
          },
          meta: {
            $ref: getSchemaPath(PageMetaDto),
          },
        },
      },
    }),
  );
};
