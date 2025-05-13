import express from "express";
import { TeamsController } from "../controllers/teamsController";

const teamsController = TeamsController.getInstance();

const teamsRouter = express.Router();

teamsRouter.get("/:id", teamsController.get);
teamsRouter.get("/:id/all", teamsController.getByUser)
teamsRouter.get("/", teamsController.getAll);
teamsRouter.post("/", teamsController.save);
teamsRouter.delete("/:id", teamsController.delete);
teamsRouter.put("/:id", teamsController.put);

export default teamsRouter;
