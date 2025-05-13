import express from "express";
import messagesRouter from "../entities/Messages/routes/messagesRoutes";
import teamsRouter from "../entities/Teams/routes/messagesRoutes";

const router = express.Router();

router.use("/messages", messagesRouter);
router.use("/teams", teamsRouter);

export default router;
