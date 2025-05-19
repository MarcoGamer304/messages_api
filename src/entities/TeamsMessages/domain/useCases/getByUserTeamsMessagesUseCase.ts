import { TeamsMessagesRepository } from "../../repository/TeamsMessagesRepository";

export class GetByUserTeamsMessagesUseCase {
  constructor(private readonly teamsMessagesRepository: TeamsMessagesRepository) {}

  async execute(id: number) {
    return await this.teamsMessagesRepository.getByUser(id);
  }
}
