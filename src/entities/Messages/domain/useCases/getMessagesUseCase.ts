import { MessagesRepository } from "../../repository/messageController";

export class GetMessagesUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(id: number) {
    return await this.messagesRepository.get(id);
  }
}
