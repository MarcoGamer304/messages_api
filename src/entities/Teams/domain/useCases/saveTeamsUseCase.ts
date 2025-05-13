import { TeamsRepository } from "../../repository/teamsController";
import { TTeams } from "../types/TTeams";

export class SaveTeamsUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(data: TTeams) {
    return await this.teamsRepository.save(data);
  }
}
