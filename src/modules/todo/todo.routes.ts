import express from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

router.post("/", todoController.createTodo);

router.get("/", todoController.getTodo);

router.get("/:id", todoController.getSingleTodo);

export const todoRoutes = router;