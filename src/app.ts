// correct the import
import { logger } from 'hono/logger';
import nosecone from "nosecone";
import notFound from './handlers/not-found';
import onError from './handlers/on-error';
import configureOpenApi from './openapi/helpers/configure-openapi';
import { createRouter } from './openapi/helpers/create-router';
import index from './routes/index.route';
import users from './routes/users/users.index';

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

  // Middleware to add Nosecone library security headers on every route
  app.use('*', async (c, next) => {
    await next();
  
    const headers = nosecone();

  Object.entries(headers).forEach(([key, value]) => {
    c.header(key, value);
  });



  });

  return app;
}

export const app = createApp();

configureOpenApi(app);

const routes = [index, users];

for (const route of routes) {
  app.route('/', route);
}

/*
//** 1 - get the name using request parameter
Example URL: http://localhost:3000/data
app.get("/:name", (c) => {
  const nameOftheUser = c.req.param("name");
  const response = c.text(`Hello world!!!!! ${nameOftheUser}`);
//** OUTPUT => Hello world!!!!! data

  return response;
}); */

/*
//** 2 - get the id using query parameter
Example URL: http://localhost:3000/search?id=12345
app.get("/search", (c) => {
  const userId = c.req.query("id") ?? "No ID provided";

  const response = c.text(`Hello world!!!!! ${userId}`);
  //** OUTPUT => Hello world!!!!! 12345

  return response;
});
*/

/*
//** 3 - serve static files from the public folder
Example URL: http://localhost:3000/images/1.png
app.use("/images/*", serveStatic({ root: "./public" }));

*/

/* //** 4 - to get the body of the request using POST method

app.post("/api/personal-data", async (c) => {
  const body = c.req.json();

  const response = c.json({
    data: await body,
  });

  return response;
}); */
