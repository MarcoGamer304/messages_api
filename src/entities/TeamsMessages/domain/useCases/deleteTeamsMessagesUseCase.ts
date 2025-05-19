import { TeamsMessagesRepository } from "../../repository/TeamsMessagesRepository";

export class DeleteTeamsMessagesUseCase {
  constructor(private readonly teamsMessagesRepository: TeamsMessagesRepository) {}

  async execute(id: number) {
    return await this.teamsMessagesRepository.delete(id);
  }
}
