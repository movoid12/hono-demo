import { createRoute, z } from "@hono/zod-openapi";

import { httpStatusCode } from "@/utils/constants";

import { usersSchema } from "./users.handler";

const tags = ["Users"];

const createSchema = z.object({
  message: z.string(),
});

const newUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
});

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
          schema: createSchema,
        },
      },
      description: "Successfully Created",
    },

  },
});

export type UserRoute = typeof list;

export type UserRouteCreate = typeof create;
