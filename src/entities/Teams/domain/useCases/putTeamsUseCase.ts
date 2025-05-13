import { TeamsRepository } from "../../repository/teamsController";
import { TTeams } from "../types/TTeams";

export class PutTeamsUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(id: number, data: TTeams) {
    return await this.teamsRepository.put(id, data);
  }
}
