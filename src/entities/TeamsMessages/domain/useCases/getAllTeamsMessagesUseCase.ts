import { TeamsMessagesRepository } from "../../repository/TeamsMessagesRepository";

export class GetAllTeamsMessagesUseCase {
  constructor(private readonly teamsMessagesRepository: TeamsMessagesRepository) {}

  async execute(id: number) {
    return await this.teamsMessagesRepository.getAll(id);
  }
}
