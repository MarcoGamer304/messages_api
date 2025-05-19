import { TeamsMessagesRepository } from "../../repository/TeamsMessagesRepository";

export class GetTeamsMessagesUseCase {
  constructor(private readonly teamsMessagesRepository: TeamsMessagesRepository) {}

  async execute(id: number) {
    return await this.teamsMessagesRepository.get(id);
  }
}
