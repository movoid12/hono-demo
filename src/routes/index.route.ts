import { createRoute } from '@hono/zod-openapi';

import { createRouter } from '../openapi/helpers/create-app';
import createMessageObjectSchema from '../openapi/schemas/create-message-schema';
import { httpStatusCode, httpStatusMessages } from '../utils/constants';

const tags = ['Index'];

const index = createRouter().openapi(
  createRoute({
    tags,
    method: 'get',
    path: '/',
    responses: {
      [httpStatusCode.OK]: {
        content: {
          'application/json': {
            schema: createMessageObjectSchema(httpStatusMessages.OK),
          },
        },
        description: 'Index API Response',
      },
    },
  }),
  (c) => {
    //* handler
    return c.json(
      {
        message: httpStatusMessages.OK,
      },
      httpStatusCode.OK,
    );
  },
);

export default index;
