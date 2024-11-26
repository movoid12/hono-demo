import { createRoute } from "@hono/zod-openapi";

import { httpStatusCode } from "@/utils/constants";

import { usersSchema } from "./users.handler";

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

export type UserRoute = typeof list;
