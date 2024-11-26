import { Hono } from "hono";
import { testClient } from "hono/testing";
import { expect, it } from "vitest";

import { httpStatusCode, httpStatusMessages } from "@/utils/constants";

import { createUserController, getUsersController } from "./user";

it("should return a list of users", async () => {
  const app = new Hono().get("/api/users", getUsersController);

  const res = await testClient(app).api.users.$get();

  const responseBody = await res.json();

  expect(responseBody).toEqual({ users: ["John", "Jane", "Bob", "Alex"] });
});

// generate a test client for createUserController function

it("should create a new user", async () => {
  const app = new Hono().post("/api/users", createUserController);

  const res = await testClient(app).api.users.$post({
    json: {
      name: "John Doe",
      email: "tGZQO@example.com",
    },
  });

  expect(res.status).toBe(httpStatusCode.CREATED);

  const responseBody = await res.json();

  expect(responseBody).toEqual({ message: httpStatusMessages.CREATED });
});

it("should return an error message for invalid request and missing email", async () => {
  const app = new Hono().post("/api/users", createUserController);

  const res = await testClient(app).api.users.$post({
    json: {
      name: "John Doe",
    },
  });

  expect(res.status).toBe(httpStatusCode.INTERNAL_SERVER_ERROR);
});

it("should return an error message for invalid email", async () => {
  const app = new Hono().post("/api/users", createUserController);

  const res = await testClient(app).api.users.$post({
    json: {
      name: "Dan Jovani",
      email: "test.terst@notvalidEmail",
    },
  });

  expect(res.status).toBe(httpStatusCode.INTERNAL_SERVER_ERROR);
});
