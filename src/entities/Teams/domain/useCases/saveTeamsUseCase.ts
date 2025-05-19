import { TeamsRepository } from "../../repository/teamsController";
import { TTeams } from "../types/TTeams";

export class SaveTeamsUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute(data: TTeams) {
    return await this.teamsRepository.save(data);
  }
}
