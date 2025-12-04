import { Request, Response } from "express";
import { pool } from "../../config/db";

const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, email } = req.body;

    try {
        const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]);
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

export const usersControllers = {
    createUser,
};