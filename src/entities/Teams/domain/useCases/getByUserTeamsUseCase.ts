import { TeamsRepository } from "../../repository/teamsController";

export class GetByUserTeamsUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute(id: number) {
    return await this.teamsRepository.getByUser(id);
  }
}
