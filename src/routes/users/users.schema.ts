import { z } from "@hono/zod-openapi";

const usersListSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    subscribed: z.boolean(),
    mevAccepted: z.boolean(),
  }),
);

const newUserSchema = z.object(
  {
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    subscribed: z.boolean(),
    mevAccepted: z.boolean(),
  },
);

const selectedUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  subscribed: z.boolean(),
  mevAccepted: z.boolean(),
}).optional();

export {
  newUserSchema,
  selectedUserSchema,
  usersListSchema as usersSchema,
};
