// correct the import
import { logger } from "hono/logger";
import nosecone from "nosecone";
import { findIp, type RequestLike } from "@arcjet/ip";
import notFound from "./handlers/not-found";
import onError from "./handlers/on-error";
import configureOpenApi from "./openapi/helpers/configure-openapi";
import { createRouter } from "./openapi/helpers/create-router";
import index from "./routes/index.route";
import users from "./routes/users/users.index";

//* by adding typeof + [number] we are getting the type of an array element
//* learned from this --> https://www.totaltypescript.com/get-the-type-of-an-array-element
type AppAsType = typeof routes;

export type AppType = AppAsType[number];

//* Creates the Hono App Main instance.
function createApp() {
  const app = createRouter();

  app.use(logger());

  app.notFound(notFound);

  app.onError(onError);

  app.use("*", async (c, next) => {

    Object.entries(nosecone()).forEach(([key, value]) => {
      c.header(key, value);
      console.log(`${key}: ${value}`);
    });

    await next();
  });

  app.use("*", async (c, next) => {

    const req = c.req.raw as unknown as RequestLike;

    const platformGuardedPublicIp = findIp(req, {platform: 'render'});

    console.log("guard",platformGuardedPublicIp);

    await next();
  });

  return app;
}

export const app = createApp();

configureOpenApi(app);

const routes = [index, users];

for (const route of routes) {
  app.route("/", route);
}