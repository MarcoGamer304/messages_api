import { TeamsRepository } from "../../repository/teamsController";

export class GetByUserTeamsUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(id: number) {
    return await this.teamsRepository.getByUser(id);
  }
}
