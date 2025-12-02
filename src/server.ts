import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express()
const port = 5000;

// parser
app.use(express.json()); //middleware
// app.use(express.urlencoded());


const pool = new Pool({
    connectionString: `postgresql://neondb_owner:npg_4SzZJG7gbqVk@ep-winter-sun-ahjppj6d-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
});

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
        
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
}

initDB()





app.get('/', (req: Request, res: Response) => {
    res.send('Hello boss')
});

app.post("/", (req: Request, res: Response) => {
    console.log(req.body);

    res.status(201).json({
        success: true,
        message: "API is working"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
