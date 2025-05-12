import Message from "../domain/models/MessageModel";
import { IMessageServices } from "../domain/interfaces/IMessagesServices";
import { IEndpointMessage } from "../domain/types/IEndpointMessage";
import { TMessage } from "../domain/types/TMessage";

export class MessageService implements IMessageServices {
  private static instance: MessageService;

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  async get(id: number): Promise<IEndpointMessage> {
    const message = await Message.findByPk(id);
    if (!message) {
      throw new Error("Comentario not found");
    }
    return message;
  }

  async getByUser(id: number): Promise<IEndpointMessage[]> {
    const message = await Message.findAll({
      where: {
        sender_id: id,
      },
    });
    if (!message) {
      throw new Error("Comentario not found");
    }
    return message;
  }

  async save(data: TMessage): Promise<IEndpointMessage> {
    const message = await Message.create(data);
    if (!message) {
      throw new Error("Comentario not found");
    }
    return message;
  }

  async delete(id: number): Promise<IEndpointMessage> {
    const message = await Message.findByPk(id);
    if (!message) {
      throw new Error("Comentario not found");
    }
    await message.destroy();
    return message;
  }

  async put(id: number, data: TMessage): Promise<IEndpointMessage> {
    const noticia = await Message.findByPk(id);
    if (!noticia) {
      throw new Error("Noticia not found");
    }
    await noticia.update(data);
    return await this.get(id);
  }
}
