/* eslint-disable ts/ban-ts-comment */
import { testClient } from 'hono/testing';
import { describe, expect, expectTypeOf, it } from 'vitest';

import { createRouter } from '../../openapi/helpers/create-router';
import {
  ZOD_ERROR_MESSAGES,
  httpStatusCode,
  httpStatusMessages,
} from '../../utils/constants';
import router from './users.index';

const client = testClient(createRouter().route('/', router));

describe('Route -> api/users/', () => {
  it('GET: api/users/ should return a list of users', async () => {
    const response = await client.api.users.$get();

    expect(response.status).toBe(httpStatusCode.OK);

    if (response.status === httpStatusCode.OK) {
      const json = await response.json();

      expectTypeOf(json).toBeArray();

      expect(json.length).toBe(4);
    }
  });

  //* get one user

  it('GET: api/users/:id returns a user', async () => {
    const response = await client.api.users[':id'].$get({
      param: {
        id: 2,
      },
    });

    expect(response.status).toBe(httpStatusCode.OK);

    if (response.status === httpStatusCode.OK) {
      const json = await response.json();

      expect(json.name).toBe('Jane Top');
    }
  });

  it('GET: api/users/:id validates the id param', async () => {
    const response = await client.api.users[':id'].$get({
      param: {
        // @ts-expect-error
        id: 'abc',
      },
    });

    expect(response.status).toBe(httpStatusCode.UNPROCESSABLE_ENTITY);

    if (response.status === httpStatusCode.UNPROCESSABLE_ENTITY) {
      const json = await response.json();
      // @ts-expect-error
      expect(json.error.issues[0].path[0]).toBe('id');
      // @ts-expect-error
      expect(json.error.issues[0].message).toBe(
        ZOD_ERROR_MESSAGES.EXPECTED_NUMBER,
      );
    }
  });

  it('GET: api/users/:id returns a not found message', async () => {
    const response = await client.api.users[':id'].$get({
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

  it('POST: api/users/ create a new user and api/users route should returns a success message', async () => {
    const response = await client.api.users.$post({
      json: {
        id: 5,
        name: 'Jane Top',
        email: 'tGZQO@example.com',
        subscribed: true,
        mevAccepted: true,
      },
    });

    if (response.status === httpStatusCode.CREATED) {
      const json = await response.json();

      expect(json.message).toBe(httpStatusMessages.CREATED);
    }
  });

  it('DELETE: api/users/:id should delete a user', async () => {
    const response = await client.api.users[':id'].$delete({
      param: {
        id: 2,
      },
    });

    if (response.status === httpStatusCode.OK) {
      const json = await response.json();
      // @ts-expect-error
      expect(json.message).toBe(httpStatusMessages.OK);
    }
  });
});
