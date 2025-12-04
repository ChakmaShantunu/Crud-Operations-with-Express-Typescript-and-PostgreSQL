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
}

export const usersControllers = {
    createUser,
    getUser
};