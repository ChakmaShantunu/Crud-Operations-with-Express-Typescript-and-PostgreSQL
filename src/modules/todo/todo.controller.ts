import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;

    try {
        const result = await todoServices.createTodo(user_id, title);
        res.status(201).json({
            success: true,
            message: "Todo created",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const todoController = {
    createTodo
}