import { createRouter } from "@/lib/create-app";

import * as handlers from "./users.handler";
import * as routes from "./users.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne);

export default router;
