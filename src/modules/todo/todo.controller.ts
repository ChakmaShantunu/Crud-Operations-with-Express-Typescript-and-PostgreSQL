import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
    // const { user_id, title } = req.body;

    try {
        const result = await todoServices.createTodo(req.body);
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
};

const getTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getTodo();

        res.status(200).json({
            success: true,
            message: "Todos retrieved successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
};

const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getSingleTodo(req.params.id!);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todos not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Todos fetched successfully",
                data: result.rows[0]
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
};

const updateSingleTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const result = await todoServices.updateSingleTodo(title, req.params.id!);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todos not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Todos updated successfully",
                data: result.rows[0]
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
};

const deleteSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.deleteSingleTodo(req.params.id!);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Todos not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Todos deleted successfully",
                data: null,
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
};

export const todoController = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateSingleTodo,
    deleteSingleTodo
};