import type { Context } from "hono";

import { z } from "zod";

import { BAD_REQUEST_MESSAGE, CREATED } from "@/utils/constants";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export function getUsersController(c: Context) {
  return c.json({ users: ["John", "Jane", "Bob", "Alex"] });
}

export function createUserController(c: Context) {
  return c.req.json()
    .then((requestBody: BodyInit) => {
      // add zod validation
      const parseResult = userSchema.safeParse(requestBody);

      if (!parseResult.success) {
        const issues = parseResult.error.issues;
        const errorMessage = `Invalid Request! ${issues
          .map(issue => `( ${issue.path} ) : ${issue.message}`)
          .join(", ")}`;

        throw new Error(errorMessage, { cause: new Error(BAD_REQUEST_MESSAGE) });
      }

      return c.json(parseResult.data, CREATED);
    });
}
