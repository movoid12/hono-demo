import { Hono } from "hono";

import userRoutes from "./userRoutes";

const router = new Hono();

router.route("/api/users", userRoutes);

export default router;
