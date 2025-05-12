import express from "express";
import { MessageController } from "../controllers/messagesController";

const messageController = MessageController.getInstance();

const messagesRouter = express.Router();

messagesRouter.get("/:id", messageController.get);
messagesRouter.get("/:id/all", messageController.getByUser);
messagesRouter.post("/", messageController.save);
messagesRouter.delete("/:id", messageController.delete);
messagesRouter.put("/:id", messageController.put);

export default messagesRouter;
