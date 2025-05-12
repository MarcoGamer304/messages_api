import { MessagesRepository } from "../../repository/messageController";

export class DeleteMessagesUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(id: number) {
    return await this.messagesRepository.delete(id);
  }
}
