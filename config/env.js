import { config } from "dotenv";

config({ path: ".env" });

export const {
    MONGO_URI, 
    JWT_SECRET,
    JWT_EXPIRES_IN,
} = process.env;
