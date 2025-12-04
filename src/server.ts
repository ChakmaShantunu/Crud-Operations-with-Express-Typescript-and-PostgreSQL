import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { usersRoutes } from "./modules/users/users.routes";
import { todoRoutes } from "./modules/todo/todo.routes";



const app = express()
const port = config.port;

// parser
app.use(express.json()); //middleware
// app.use(express.urlencoded());

// initializing DB
initDB()



app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello boss');
});

// users CRUD
app.use("/users", usersRoutes)


//todos crud
app.use("/todos", todoRoutes)


app.get("/todos/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [req.params.id]);

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
});

app.put("/todos/:id", async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const result = await pool.query(`UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`, [title, req.params.id]);

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
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [req.params.id]);

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
});

// not found route
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
