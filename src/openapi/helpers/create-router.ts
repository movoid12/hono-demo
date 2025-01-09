import {
  OpenAPIHono,
  type RouteConfig,
  type RouteHandler,
} from '@hono/zod-openapi';

import defaultHook from '../default-hook';

// interface AppBindings {
//   Variables: {
// TODO: add PinoLogger from hono-pino example ==> logger: PinoLogger;
//     logger: string;
//   };
// }

// TODO: add AppBindings to OpenApiHono Type --> export type AppOpenApi = OpenAPIHono<AppBindings>;

// TODO: add AppBindings to RouteHandler next to R generic
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R>;

export function createRouter() {
  //* default hook will be applied to all routes in case of any zod validation error happens
  return new OpenAPIHono({ strict: false, defaultHook: defaultHook });
}
