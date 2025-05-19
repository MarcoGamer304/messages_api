import { MessagesRepository } from "../../repository/messagesRepository";

export class DeleteMessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(id: number) {
    return await this.messagesRepository.delete(id);
  }
}
