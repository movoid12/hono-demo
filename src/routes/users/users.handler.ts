import type { AppRouteHandler } from "@/lib/types";

import { httpStatusCode, httpStatusMessages } from "@/utils/constants";

import type { UserRoute, UserRouteCreate, UserRouteGetOne } from "./users.routes";

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

export const getOne: AppRouteHandler<UserRouteGetOne> = (c) => {
  const { id } = c.req.valid("param");

  // Safely get the user from list by id and return
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "tGZQO@example.com",
      subscribed: true,
      mevAccepted: true,
    },
    {
      id: 2,
      name: "Jane Top",
      email: "tGZQO@example.com",
      subscribed: false,
      mevAccepted: false,
    },
  ];

  const user = users.find(user => user.id === id);

  if (!user) {
    return c.json(
      {
        message: httpStatusMessages.NOT_FOUND,
      },
      httpStatusCode.NOT_FOUND,
    );
  }

  return c.json(
    user,
    httpStatusCode.OK,
  );
};
