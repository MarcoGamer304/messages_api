import { Server } from "socket.io";

export const initSocket = (server: any, origin: string): Server => {
  const io = new Server(server, {
    cors: {
      origin: origin,
      methods: ["GET, POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("message", (data) => {
      console.log("Mensaje recibido:", data);
      socket.emit("respuesta", "¡Mensaje recibido!");
    });
  });

  return io;
};
