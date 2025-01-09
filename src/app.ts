// correct the import
import configureOpenApi from './openapi/helpers/configure-openapi';
import { createApp } from './openapi/helpers/create-app';

import index from './routes/index.route';
import users from './routes/users/users.index';

const app = createApp();

configureOpenApi(app);

const routes = [index, users];

// biome-ignore lint/complexity/noForEach: <explanation>
routes.forEach((route) => {
  app.route('/', route);
});

//* by adding typeof + [number] we are getting the type of an array element
//* learned from this --> https://www.totaltypescript.com/get-the-type-of-an-array-element
type AppAsType = typeof routes;

export type AppType = AppAsType[number];

export default app;

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
