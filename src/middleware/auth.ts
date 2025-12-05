import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";


const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(500).json({
                    success: false,
                    message: "You are not allowed"
                })
            }
            const decoded = jwt.verify(token, config.jwtSecret as string);
            console.log({ decodedToken: decoded });
            console.log({ authToken: token });
            req.user = decoded as JwtPayload;
            next();
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
};

export default auth;