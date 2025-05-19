import { MessagesRepository } from "../../repository/messagesRepository";
import { TMessage } from "../types/TMessage";

export class SaveMessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(data: TMessage) {
    return await this.messagesRepository.save(data);
  }
}
