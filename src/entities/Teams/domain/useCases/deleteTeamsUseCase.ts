import { TeamsRepository } from "../../repository/teamsController";

export class DeleteTeamsUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute(id: number) {
    return await this.teamsRepository.delete(id);
  }
}
