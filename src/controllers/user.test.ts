import { Hono } from "hono";
import { testClient } from "hono/testing";
import { expect, it } from "vitest";

import { getUsersController } from "./user";

it("should return a list of users", async () => {
  const app = new Hono().get("/api/users", getUsersController);

  const res = await testClient(app).api.users.$get();

  const responseBody = await res.json();

  expect(responseBody).toEqual({ users: ["John", "Jane", "Bob", "Alex"] });
});
