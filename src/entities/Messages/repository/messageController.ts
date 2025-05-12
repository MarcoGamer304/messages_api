import { IMessageServices } from "../domain/interfaces/IMessagesServices";
import { IEndpointMessage } from "../domain/types/IEndpointMessage";
import { TMessage } from "../domain/types/TMessage";
import { MessageService } from "../services/messageService";

export class MessagesRepository implements IMessageServices {
  private static instance: MessagesRepository;
  private messageService = MessageService.getInstance();

  public static getInstance(): MessagesRepository {
    if (!MessagesRepository.instance) {
      MessagesRepository.instance = new MessagesRepository();
    }
    return MessagesRepository.instance;
  }

  async get(id: number): Promise<IEndpointMessage> {
    return await this.messageService.get(id);
  }

  async getByUser(id: number): Promise<IEndpointMessage[]> {
    return await this.messageService.getByUser(id);
  }

  async save(data: TMessage): Promise<IEndpointMessage> {
    return await this.messageService.save(data);
  }

  async delete(id: number): Promise<IEndpointMessage> {
    return await this.messageService.delete(id);
  }

  async put(id: number, data: TMessage): Promise<IEndpointMessage> {
    return await this.messageService.put(id, data);
  }
}
