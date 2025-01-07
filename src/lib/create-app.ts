import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';
import notFound from '../middleware/not-found';
import onError from '../middleware/on-error';
import defaultHook from '../openapi/default-hook';

export function createRouter() {
  //* default hook will be applied to all routes in case of any zod validation error happens
  return new OpenAPIHono({ strict: false, defaultHook: defaultHook });
}

export default function createApp() {
  const app = createRouter();

  app.use(logger());

  app.notFound(notFound);

  app.onError(onError);

  return app;
}
