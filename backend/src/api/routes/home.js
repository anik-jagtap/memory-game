import express from "express";
import HomeController from "../controllers/home";
const HomeRouter = express.Router();
export default function({ app }) {
    HomeRouter.get("/", HomeController.home);
    app.use("/", HomeRouter);
}