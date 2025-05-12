import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "./utilities/config";
import { Server } from "socket.io";
import { sequelize } from "./database/connection";
import { limiter } from "./utilities/limiter";
import messagesRouter from "./entities/Messages/routes/messagesRoutes";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.CORS_ORIGIN,
    methods: ["GET, POST"],
  },
});

app.use(helmet());
app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(limiter);

sequelize
  .authenticate()
  .then(() => console.log("successfully connected"))
  .catch((err) => console.error("err:", err));

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
    socket.emit("respuesta", "¡Mensaje recibido!");
  });
});

app.use("/api/messages", messagesRouter);

app.get("/", (req, res) => {
  res.send("api rest wsocket");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default io;
