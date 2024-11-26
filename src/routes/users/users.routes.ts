import { createRoute, z } from "@hono/zod-openapi";

import createErrorSchema from "@/openapi/schemas/create-error-schema";
import { httpStatusCode, notFoundSchema } from "@/utils/constants";

const tags = ["Users"];

const messageObjectSchema = z.object({
  message: z.string(),
});

const usersSchema = z.array(z.object({
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
}));

const newUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
});

const idParamsSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: "id",
      in: "path",
      required: true,
    },
    required: ["id"],
    example: 1,
  }),
});

const selectedUser = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
}).optional();

export const list = createRoute({
  path: "/api/users",
  tags,
  method: "get",
  responses: {
    [httpStatusCode.OK]: {
      content: {
        "application/json": {
          schema: usersSchema,
        },
      },
      description: "The List of Users",
    },
  },
});

export const create = createRoute({
  path: "/api/users",
  tags,
  method: "post",
  request: {
    body: {
      application: "json",
      required: true,
      content: {
        "application/json": {
          schema: newUserSchema,
        },
      },
      description: "New User",
    },
  },
  responses: {
    [httpStatusCode.CREATED]: {
      content: {
        "application/json": {
          schema: messageObjectSchema,
        },
      },
      description: "Successfully Created",
    },

  },
});

export const getOne = createRoute({
  path: "/api/users/{id}",
  tags,
  method: "get",
  request: {
    params: idParamsSchema,
  },
  responses: {
    [httpStatusCode.OK]: {
      content: {
        "application/json": {
          schema: selectedUser,
        },
      },
      description: "Get one user by ID",
    },
    [httpStatusCode.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: notFoundSchema,
        },
      },
      description: "User not found",
    },
    [httpStatusCode.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(idParamsSchema),
        },
      },
      description: "Validation Error",
    },
  },
});

export type UserRoute = typeof list;

export type UserRouteCreate = typeof create;

export type UserRouteGetOne = typeof getOne;
