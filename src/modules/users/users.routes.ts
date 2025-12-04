import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { usersControllers } from "./users.controller";

const router = express.Router();

router.post("/", usersControllers.createUser);

router.get("/", usersControllers.getUser);

router.get("/:id", usersControllers.getSingleUser);

router.put("/:id", usersControllers.updateSingleUser);

router.delete("/:id", usersControllers.deleteSingleUser);

export const usersRoutes = router;