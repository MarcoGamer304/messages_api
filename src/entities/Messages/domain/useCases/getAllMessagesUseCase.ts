import { MessagesRepository } from "../../repository/messageController";

export class GetAllMessagesUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(id: number) {
    return await this.messagesRepository.getByUser(id);
  }
}
