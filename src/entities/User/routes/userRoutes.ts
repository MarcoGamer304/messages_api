import express from "express";
import { UserController } from "../controllers/messagesController";

const userController = UserController.getInstance();

const usersRouter = express.Router();

usersRouter.get("/:id", userController.get);

export default usersRouter;
