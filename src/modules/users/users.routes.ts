import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { usersControllers } from "./users.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", usersControllers.createUser);

router.get("/", logger, auth("admin"), usersControllers.getUser);

router.get("/:id", auth("admin", "user"), usersControllers.getSingleUser);

router.put("/:id", usersControllers.updateSingleUser);

router.delete("/:id", usersControllers.deleteSingleUser);

export const usersRoutes = router;