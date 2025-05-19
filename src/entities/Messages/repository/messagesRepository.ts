import { IMessagesRepository } from "../domain/interfaces/IMessagesRepository";
import { TEndpointMessage } from "../domain/types/TEndpointMessage";
import { TMessage } from "../domain/types/TMessage";
import { MessageService } from "../services/messageService";

export class MessagesRepository implements IMessagesRepository {
  private static instance: MessagesRepository;

  public static getInstance(): MessagesRepository {
    if (!MessagesRepository.instance) {
      MessagesRepository.instance = new MessagesRepository();
    }
    return MessagesRepository.instance;
  }

  private readonly messageService = MessageService.getInstance();
  
  get = async (id: number): Promise<TEndpointMessage> => {
    return await this.messageService.get(id);
  };

  getByUser = async (id: number): Promise<TEndpointMessage[]> => {
    return await this.messageService.getByUser(id);
  };

  save = async (data: TMessage): Promise<TEndpointMessage> => {
    return await this.messageService.save(data);
  };

  delete = async (id: number): Promise<TEndpointMessage> => {
    return await this.messageService.delete(id);
  };

  put = async (id: number, data: TMessage): Promise<TEndpointMessage> => {
    return await this.messageService.put(id, data);
  };
}
