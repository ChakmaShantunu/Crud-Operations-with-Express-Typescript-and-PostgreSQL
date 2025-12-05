import { pool } from "../../config/db";
import bycrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from "../../config";

const loginUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];

    const match = await bycrypt.compare(password, user.password);

    
    if (!match) {
        return false;
    } 

    const token = jwt.sign({ name: user.name, email: user.email }, config.jwtSecret as string, {
        expiresIn: "7d",
    });
    

    return { token, user };
};

export const authServices = {
    loginUser
}