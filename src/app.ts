import { OpenAPIHono } from "@hono/zod-openapi";

import notFound from "@/middleware/not-found";
import onError from "@/middleware/on-error";
import router from "@/routes";

const app = new OpenAPIHono();

// routes
app.route("/", router);

// error handlers
app.notFound(notFound);

app.onError(onError);

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
