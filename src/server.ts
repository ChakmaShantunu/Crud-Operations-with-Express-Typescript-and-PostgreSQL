import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { usersRoutes } from "./modules/users/users.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";



const app = express()
const port = config.port;

// parser
app.use(express.json()); //middleware

// initializing DB
initDB()


app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello boss');
});

// users CRUD
app.use("/users", usersRoutes)


//todos crud
app.use("/todos", todoRoutes);

//auth routes
app.use("/auth", authRoutes);


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
