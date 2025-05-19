import { Server } from "socket.io";
import { TeamsMessagesUseCasesController } from "../entities/TeamsMessages/controllers/teamsMessagesUseCasesController";
import { TeamsMessagesRepository } from "../entities/TeamsMessages/repository/TeamsMessagesRepository";
import { MessagesUseCasesController } from "../entities/Messages/controllers/messagesUseCasesController";
import { MessagesRepository } from "../entities/Messages/repository/messagesRepository";

const useCasesTeams = new TeamsMessagesUseCasesController(
  TeamsMessagesRepository.getInstance()
);
const useCases = new MessagesUseCasesController(
  MessagesRepository.getInstance()
);

export const initSocket = (server: any, origin: string): Server => {
  const io = new Server(server, {
    cors: {
      origin: origin,
      methods: ["GET, POST"],
    },
  });

  const usersMap = new Map();

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("register", ({ userId, groupIds }) => {
      usersMap.set(userId, socket.id);
      console.log(`Usuario ${userId} registrado`);

      if (groupIds && Array.isArray(groupIds)) {
        groupIds.forEach((groupId) => {
          socket.join(`group_${groupId}`);
          console.log(`user ${userId} join to group ${groupId}`);
        });
      }
    });

    socket.on("private_message", async (messageData) => {
      try {
        const savedMessage = await useCases.save.execute(messageData);

        const recipientSocketId = usersMap.get(savedMessage.recipient_id);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("new_private_message", savedMessage);
        }

        socket.emit("message_sent", savedMessage);
      } catch (err) {
        console.error("error at save message", err);
        socket.emit("message_error", {
          error: "error at save private message",
        });
      }
    });

    socket.on("group_message", async (groupMessageData) => {
      try {
        const savedGroupMessage = await useCasesTeams.save.execute(
          groupMessageData
        );

        socket
          .to(`group_${groupMessageData.groupId}`)
          .emit("new_group_message", savedGroupMessage);

        socket.emit("message_sent", savedGroupMessage);
      } catch (err) {
        console.error("error at save team message", err);
        socket.emit("message_error", {
          error: "error at save team message",
        });
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of usersMap.entries()) {
        if (sockId === socket.id) {
          usersMap.delete(userId);
          console.log(`user ${userId} disconnected`);
          break;
        }
      }
    });
  });

  return io;
};
