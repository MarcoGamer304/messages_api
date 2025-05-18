import express from "express";
import { TeamsMessagesController } from "../controllers/teamsMessagesController";

const teamsMessagesController = TeamsMessagesController.getInstance();
const teamsMessagesRouter = express.Router();

teamsMessagesRouter.get("/:id", teamsMessagesController.get);
teamsMessagesRouter.get("/:id/all", teamsMessagesController.getByUser)
teamsMessagesRouter.get("/team/:id/all", teamsMessagesController.getAll);
teamsMessagesRouter.post("/", teamsMessagesController.save);
teamsMessagesRouter.delete("/:id", teamsMessagesController.delete);
teamsMessagesRouter.put("/:id", teamsMessagesController.put);

export default teamsMessagesRouter;
