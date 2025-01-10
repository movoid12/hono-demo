import {
  type AppRouteHandler,
  createRouter,
} from '../../openapi/helpers/create-router';
import { httpStatusCode, httpStatusMessages } from '../../utils/constants';
import * as routes from './users.routes';

//* Handlers
const getUsersList: AppRouteHandler<typeof routes.list> = (c) => {
  // TODO: add getting list function when integrating with a database
  return c.json(usersMock);
};

const createUser: AppRouteHandler<typeof routes.create> = (c) => {
  // TODO: add create/insert function when integrating with a database

  return c.json(
    {
      message: httpStatusMessages.CREATED,
    },
    httpStatusCode.CREATED,
  );
};

const getUser: AppRouteHandler<typeof routes.getOne> = (c) => {
  const { id } = c.req.valid('param');

  const user = usersMock.find((user) => user.id === id);

  if (!user) {
    return c.json(
      {
        message: httpStatusMessages.NOT_FOUND,
      },
      httpStatusCode.NOT_FOUND,
    );
  }

  return c.json(user, httpStatusCode.OK);
};

// * Routes
const users = createRouter()
  .openapi(routes.list, getUsersList)
  .openapi(routes.create, createUser)
  .openapi(routes.getOne, getUser);

const usersMock = [
  {
    id: 1,
    name: 'John Doe',
    email: 'tGZQO@example.com',
    subscribed: true,
    mevAccepted: true,
  },
  {
    id: 2,
    name: 'Jane Top',
    email: 'tGZQO@example.com',
    subscribed: false,
    mevAccepted: false,
  },
  {
    id: 3,
    name: 'Bob Doe',
    email: 'tGZQO@example.com',
    subscribed: false,
    mevAccepted: true,
  },
  {
    id: 4,
    name: 'Alex Doe',
    email: 'tGZQO@example.com',
    subscribed: true,
    mevAccepted: true,
  },
];

export default users;
