import { MessagesRepository } from "../../repository/messageController";
import { TMessage } from "../types/TMessage";

export class SaveMessagesUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(data: TMessage) {
    return await this.messagesRepository.save(data);
  }
}
