/* eslint-disable unicorn/filename-case */
import { OpenAPIHono } from "@hono/zod-openapi";

import notFound from "@/middleware/not-found";
import onError from "@/middleware/on-error";
import defaultHook from "@/openapi/default-hook";

export function createRouter() {
  //* default hook will be applied to all routes in case of any zod validation error happens
  //* https://docs.hono.dev/en/v2.0.0/reference/hono#default-hook
  return new OpenAPIHono({ strict: false, defaultHook });
};

export default function createApp() {
  const app = createRouter();

  // error handlers
  app.notFound(notFound);

  app.onError(onError);

  return app;
}
