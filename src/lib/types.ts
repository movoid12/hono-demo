import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

export type AppOpenApi = OpenAPIHono;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R>;
