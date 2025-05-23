import { TeamsMessagesRepository } from "../../repository/TeamsMessagesRepository";
import { TTeamsMessages } from "../types/TTeamsMessages";

export class SaveTeamsMessagesUseCase {
  constructor(private readonly teamsMessagesRepository: TeamsMessagesRepository) {}

  async execute(data: TTeamsMessages) {
    return await this.teamsMessagesRepository.save(data);
  }
}
