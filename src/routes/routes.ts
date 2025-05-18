import express from "express";
import messagesRouter from "../entities/Messages/routes/messagesRoutes";
import teamsRouter from "../entities/Teams/routes/messagesRoutes";
import teamsMessagesRouter from "../entities/TeamsMessages/routes/teamsMessagesRoutes";

const router = express.Router();

router.use("/messages", messagesRouter);
router.use("/teams", teamsRouter);
router.use("/teams/messages", teamsMessagesRouter);

export default router;
