import DotEnv from "dotenv";
const envFound = DotEnv.config();
if (envFound.error) {
    throw new Error("Environment configuration not found!");
}
process.env.NODE_ENV = process.env.NODE_ENV || "development";
export default {
    HOST: process.env.HOST,
    PORT: process.env.PORT || 3000
}