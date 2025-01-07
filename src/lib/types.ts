import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';

// interface AppBindings {
//   Variables: {
// TODO: add PinoLogger from hono-pino example ==> logger: PinoLogger;
//     logger: string;
//   };
// }

// TODO: add AppBindings to OpenApiHono Type --> export type AppOpenApi = OpenAPIHono<AppBindings>;
export type AppOpenApi = OpenAPIHono;

// TODO: add AppBindings to RouteHandler next to R generic
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R>;
