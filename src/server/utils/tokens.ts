import jwt from "jsonwebtoken";
import config from "../config";

export const createJWT = ( id: number ) => {
    try {
        const token = jwt.sign({ id }, config.jwt.secret, { expiresIn: config.jwt.expires });
        return token;
    } catch (error) {
        throw error;
    }
};