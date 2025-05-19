import { MessagesRepository } from "../../repository/messagesRepository";
import { TMessage } from "../types/TMessage";

export class PutMessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(id: number, data: TMessage) {
    return await this.messagesRepository.put(id, data);
  }
}
