import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { usersControllers } from "./users.controller";

const router = express.Router();

// app.use("/users", userRoutes)
router.post("/", usersControllers.createUser);


router.get("/", usersControllers.getUser);

export const usersRoutes = router;