import { TeamsRepository } from "../../repository/teamsController";

export class GetTeamsUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(id: number) {
    return await this.teamsRepository.get(id);
  }
}
