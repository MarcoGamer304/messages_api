import { TeamsRepository } from "../../repository/teamsController";

export class GetAllTeamsUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute() {
    return await this.teamsRepository.getAll();
  }
}
