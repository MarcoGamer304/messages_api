import { MessagesRepository } from "../../repository/messagesRepository";

export class GetMessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(id: number) {
    return await this.messagesRepository.get(id);
  }
}
