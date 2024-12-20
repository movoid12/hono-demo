import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenApi } from "@/lib/types";

import packageJson from "../../package.json";

export default function configureOpenAPI(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Demo API",
      version: packageJson.version,
    },
  }).get(
    "/reference",
    apiReference({
      spec: {
        url: "/doc",
      },
      layout: "classic",
      theme: "kepler",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
    }),
  );
}
