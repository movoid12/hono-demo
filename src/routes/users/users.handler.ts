import { z } from "@hono/zod-openapi";

import type { AppRouteHandler } from "@/lib/types";

import { httpStatusMessages } from "@/utils/constants";

import type { UserRoute, UserRouteCreate } from "./users.routes";

export const usersSchema = z.array(z.object({
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
}));

// TODO: add async to the function when integrating with a database
export const list: AppRouteHandler<UserRoute> = (c) => {
  const users = [
    {
      name: "John Doe",
      email: "tGZQO@example.com",
      subscribed: true,
      mevAccepted: true,
    },
    {
      name: "Jane Top",
      email: "tGZQO@example.com",
      subscribed: false,
      mevAccepted: false,
    },
    {
      name: "Bob Doe",
      email: "tGZQO@example.com",
      subscribed: false,
      mevAccepted: true,
    },
    {
      name: "Alex Doe",
      email: "tGZQO@example.com",
      subscribed: true,
      mevAccepted: true,
    },
  ];

  return c.json(users);
};

// TODO: add async to the function when integrating with a database
export const create: AppRouteHandler<UserRouteCreate> = (c) => {
  // TODO: add create function when integrating with a database
  const successfullRes = {
    message: httpStatusMessages.CREATED,
  };

  return c.json(successfullRes);
};
