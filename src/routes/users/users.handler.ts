import { z } from "@hono/zod-openapi";

import type { AppRouteHandler } from "@/lib/types";

import type { UserRoute } from "./users.routes";

export const usersSchema = z.array(z.object({
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
}));

export const list: AppRouteHandler<UserRoute> = (c) => {
  return c.json([
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
  ]);
};
