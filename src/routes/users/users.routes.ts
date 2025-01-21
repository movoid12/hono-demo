import * as http from 'node:http';
import { createRoute, z } from '@hono/zod-openapi';

import createErrorSchema from '../../openapi/schemas/create-error-schema';
import createMessageObjectSchema from '../../openapi/schemas/create-message-schema';
import { idParamsSchema } from '../../openapi/schemas/id-params-schema';
import { httpStatusCode, notFoundSchema } from '../../utils/constants';

const usersListSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    subscribed: z.boolean(),
    mevAccepted: z.boolean(),
  }),
);

const newUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
});

const selectedUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
});

const tags = ['Users'];

export const list = createRoute({
  path: '/users',
  tags,
  method: 'get',
  responses: {
    [httpStatusCode.OK]: {
      content: {
        'application/json': {
          schema: usersListSchema,
        },
      },
      description: 'The List of Users',
    },
  },
});

export const create = createRoute({
  path: '/users',
  tags,
  method: 'post',
  request: {
    body: {
      application: 'json',
      required: true,
      content: {
        'application/json': {
          schema: newUserSchema,
        },
      },
      description: 'Create New User',
    },
  },
  responses: {
    [httpStatusCode.CREATED]: {
      content: {
        'application/json': {
          schema: createMessageObjectSchema(http.STATUS_CODES[201]),
        },
      },
      description: 'New user successfully created',
    },
    [httpStatusCode.UNPROCESSABLE_ENTITY]: {
      content: {
        'application/json': {
          schema: createErrorSchema(newUserSchema),
        },
      },
      description: 'Validation Error',
    },
  },
});

export const getOne = createRoute({
  path: '/users/:id',
  tags,
  method: 'get',
  request: {
    params: idParamsSchema,
  },
  responses: {
    [httpStatusCode.OK]: {
      content: {
        'application/json': {
          schema: selectedUserSchema,
        },
      },
      description: 'Get one user by ID',
    },
    [httpStatusCode.NOT_FOUND]: {
      content: {
        'application/json': {
          schema: notFoundSchema,
        },
      },
      description: 'User not found',
    },
    [httpStatusCode.UNPROCESSABLE_ENTITY]: {
      content: {
        'application/json': {
          schema: createErrorSchema(idParamsSchema),
        },
      },
      description: 'Validation Error',
    },
  },
});

export const deleteOne = createRoute({
  path: '/users/:id',
  tags,
  method: 'delete',
  request: {
    params: idParamsSchema,
  },
  responses: {
    [httpStatusCode.OK]: {
      description: 'User successfully deleted',
    },
    [httpStatusCode.NO_CONTENT]: {
      content: {
        'application/json': {
          schema: createMessageObjectSchema(http.STATUS_CODES[204]),
        },
      },
      description: 'User not found',
    },
  },
  [httpStatusCode.BAD_REQUEST]: {
    content: {
      'application/json': {
        schema: createErrorSchema(idParamsSchema),
      },
    },
    description: 'Validation Error',
  },
});
