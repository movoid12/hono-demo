import {
  OpenAPIHono,
  type RouteConfig,
  type RouteHandler,
} from '@hono/zod-openapi';
import type { Context } from 'hono';
import { httpStatusCode } from '../../utils/constants';

// interface AppBindings {
//   Variables: {
// TODO: add PinoLogger from hono-pino example ==> logger: PinoLogger;
//     logger: string;
//   };
// }

// TODO: add AppBindings to OpenApiHono Type --> export type AppOpenApi = OpenAPIHono<AppBindings>;

// TODO: add AppBindings to RouteHandler next to R generic
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R>;

// biome-ignore lint/suspicious/noExplicitAny: imp to have
const defaultHook = (result: any, c: Context) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      httpStatusCode.UNPROCESSABLE_ENTITY,
    );
  }
};

export function createRouter() {
  //* default hook will be applied to all routes in case of any zod validation error happens
  return new OpenAPIHono({ strict: false, defaultHook: defaultHook });
}
