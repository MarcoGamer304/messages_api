import { MessagesRepository } from "../../repository/messageController";
import { TMessage } from "../types/TMessage";

export class PutMessagesUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(id: number, data: TMessage) {
    return await this.messagesRepository.put(id, data);
  }
}
