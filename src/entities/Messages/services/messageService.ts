import Message from "../domain/models/MessageModel";
import { IMessageServices } from "../domain/interfaces/IMessagesServices";
import { TEndpointMessage } from "../domain/types/TEndpointMessage";
import { TMessage } from "../domain/types/TMessage";
import User from "../../User/domain/models/UserModel";

export class MessageService implements IMessageServices {
  private static instance: MessageService;

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  get = async (id: number): Promise<TEndpointMessage> => {
    const message = await Message.findByPk(id);
    if (!message) {
      throw new Error("message not found");
    }
    return message;
  };

  getByUser = async (id: number): Promise<TEndpointMessage[]> => {
    const message = await Message.findAll({
      where: {
        sender_id: id,
      },
      include: [
        { model: User, as: "recipient", attributes: ["id", "username", "email", "online", "last_seen"] },
      ],
    });
    if (message.length === 0) {
      throw new Error("user dont have messages");
    }
    return message;
  };

  save = async (data: TMessage): Promise<TEndpointMessage> => {
    const message = await Message.create(data);
    if (!message) {
      throw new Error("message not found");
    }
    return message;
  };

  delete = async (id: number): Promise<TEndpointMessage> => {
    const message = await Message.findByPk(id);
    if (!message) {
      throw new Error("message not found");
    }
    await message.destroy();
    return message;
  };

  put = async (id: number, data: TMessage): Promise<TEndpointMessage> => {
    const noticia = await Message.findByPk(id);
    if (!noticia) {
      throw new Error("message not found");
    }
    await noticia.update(data);
    return await this.get(id);
  };
}
