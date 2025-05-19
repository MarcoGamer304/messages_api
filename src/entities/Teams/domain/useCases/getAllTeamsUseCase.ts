import { TeamsRepository } from "../../repository/teamsController";

export class GetAllTeamsUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute() {
    return await this.teamsRepository.getAll();
  }
}
