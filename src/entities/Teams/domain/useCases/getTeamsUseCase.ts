import { TeamsRepository } from "../../repository/teamsController";

export class GetTeamsUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute(id: number) {
    return await this.teamsRepository.get(id);
  }
}
