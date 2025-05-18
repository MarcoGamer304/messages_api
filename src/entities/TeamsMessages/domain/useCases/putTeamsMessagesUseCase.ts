import { TeamsMessagesRepository } from "../../repository/TeamsMessagesRepository";
import { TTeamsMessages } from "../types/TTeamsMessages";

export class PutTeamsMessagesUseCase {
  constructor(private teamsMessagesRepository: TeamsMessagesRepository) {}

  async execute(id: number, data: TTeamsMessages) {
    return await this.teamsMessagesRepository.put(id, data);
  }
}
