import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@/lib/createApp";
import { httpStatusCode, httpStatusMessages } from "@/utils/constants";

import userRoutes from "./userRoutes";

// eslint-disable-next-line unused-imports/no-unused-vars
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const usersSchema = z.object({ users: z.array(z.string()) });

const index = createRouter().openapi(createRoute({
  tags: ["Users"],
  method: "get",
  path: "/api/users",
  responses: {
    [httpStatusCode.OK]: {
      content: {
        "application/json": {
          schema: usersSchema,
        },
      },
      description: "Users API: Returns a list of users",
    },
  },
}), (c) => {
  //* handler
  return c.json({ users: ["John", "Jane", "Bob", "Alex"] }, httpStatusCode.OK);
});

export default index;
