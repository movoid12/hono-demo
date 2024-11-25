/* eslint-disable unicorn/filename-case */

import { Hono } from "hono";

import { createUserController, getUsersController } from "@/controllers/user.js";
import { CREATED, CREATED_MESSAGE } from "@/utils/constants.js";

const userRoutes = new Hono();

userRoutes.get("/", getUsersController);

userRoutes.post(
  "/",
  createUserController,
);

export default userRoutes;
