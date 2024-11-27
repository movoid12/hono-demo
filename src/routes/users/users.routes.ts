import { createRoute } from "@hono/zod-openapi";

import createErrorSchema from "@/openapi/schemas/create-error-schema";
import createMessageObjectSchema from "@/openapi/schemas/create-message-schema";
import { idParamsSchema } from "@/openapi/schemas/params-schema";
import { httpStatusCode, httpStatusMessages, notFoundSchema } from "@/utils/constants";

import { newUserSchema, selectedUserSchema, usersSchema } from "./users.schema";

const tags = ["Users"];

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
          schema: createMessageObjectSchema(httpStatusMessages.CREATED),
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
          schema: selectedUserSchema,
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
