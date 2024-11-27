/* eslint-disable ts/ban-ts-comment */
import { testClient } from "hono/testing";
import { expect, expectTypeOf, it } from "vitest";

import createApp from "@/lib/createApp";
import { httpStatusCode, httpStatusMessages, ZOD_ERROR_MESSAGES } from "@/utils/constants";

import router from "./users.index";

const client = testClient(createApp().route("/", router));

it("should return a list of users", async () => {
  const response = await client.api.users.$get();

  expect(response.status).toBe(httpStatusCode.OK);

  if (response.status === httpStatusCode.OK) {
    const json = await response.json();

    expectTypeOf(json).toBeArray();

    expect(json.length).toBe(4);
  }
});

//* get one user

it("get api/users/{id} returns a user", async () => {
  const response = await client.api.users[":id"].$get({
    param: {
      id: 2,
    },
  });

  expect(response.status).toBe(httpStatusCode.OK);

  if (response.status === httpStatusCode.OK) {
    const json = await response.json();

    expect(json.name).toBe("Jane Top");
  }
});

it("get api/users/{id} validates the id param", async () => {
  const response = await client.api.users[":id"].$get({
    param: {
      // @ts-expect-error
      id: "abc",
    },
  });

  expect(response.status).toBe(httpStatusCode.UNPROCESSABLE_ENTITY);

  if (response.status === httpStatusCode.UNPROCESSABLE_ENTITY) {
    const json = await response.json();

    expect(json.error.issues[0].path[0]).toBe("id");
    expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
  }
});

it("get api/users/{id} returns a not found message", async () => {
  const response = await client.api.users[":id"].$get({
    param: {
      id: 5,
    },
  });

  expect(response.status).toBe(httpStatusCode.NOT_FOUND);

  if (response.status === httpStatusCode.NOT_FOUND) {
    const json = await response.json();

    expect(json.message).toBe(httpStatusMessages.NOT_FOUND);
  }
});

//* create a new user

it("create a new user and api/users route should returns a success message", async () => {
  const response = await client.api.users.$post({
    json: {
      id: 5,
      name: "Jane Top",
      email: "tGZQO@example.com",
      subscribed: true,
      mevAccepted: true,
    },
  });

  if (response.status === httpStatusCode.CREATED) {
    const json = await response.json();

    expect(json.message).toBe(httpStatusMessages.CREATED);
  }
});
