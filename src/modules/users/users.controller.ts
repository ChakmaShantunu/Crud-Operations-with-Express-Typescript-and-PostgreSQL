import { Request, Response } from "express";
import { pool } from "../../config/db";
import { usersServices } from "./users.service";

const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, email } = req.body;

    try {
        const result = await usersServices.createUser(name, email);
        // console.log(result.rows[0]);
        return res.status(201).json({
            success: true,
            message: "Data inserted Successfully",
            data: result.rows[0],
        });

        // res.send({ message: "data inserted" })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.getUser();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        });
    }
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.getSingleUser(req.params.id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
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

const updateSingleUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await usersServices.updateSingleUser(name, email, req.params.id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
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

export const usersControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateSingleUser
};