import { TeamsRepository } from "../../repository/teamsController";

export class DeleteTeamsUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(id: number) {
    return await this.teamsRepository.delete(id);
  }
}
