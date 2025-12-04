import express from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

router.post("/", todoController.createTodo);

router.get("/", todoController.getTodo);

export const todoRoutes = router;