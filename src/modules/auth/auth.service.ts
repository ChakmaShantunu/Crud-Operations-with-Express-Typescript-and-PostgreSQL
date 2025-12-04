import { pool } from "../../config/db";
import bycrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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

    const secret = process.env.JWT_SECRET

    const token = jwt.sign({ name: user.name, email: user.email }, secret, {
        expiresIn: "7d",
    });
    console.log({ token })

    return { token, user };
};

export const authServices = {
    loginUser
}