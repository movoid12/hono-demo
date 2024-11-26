import { createRouter } from "@/lib/createApp";

import * as handlers from "./users.handler";
import * as routes from "./users.routes";

const router = createRouter().openapi(routes.list, handlers.list);

export default router;
