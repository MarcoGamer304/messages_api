import http from "http";
import app from "./app/appConfig";
import { config } from "./utilities/config";
import { initDB } from "./database/init";
import { initSocket } from "./sockets/socket.io";

const server = http.createServer(app);

initDB();

const io = initSocket(server, config.CORS_ORIGIN);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default io;
