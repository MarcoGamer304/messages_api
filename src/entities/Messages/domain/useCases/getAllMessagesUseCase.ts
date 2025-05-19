import { MessagesRepository } from "../../repository/messagesRepository";

export class GetAllMessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(id: number) {
    return await this.messagesRepository.getByUser(id);
  }
}
