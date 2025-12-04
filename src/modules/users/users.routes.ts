import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { usersControllers } from "./users.controller";

const router = express.Router();

// app.use("/users", userRoutes)
router.post("/", usersControllers.createUser);


router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
});

export const userRoutes = router;