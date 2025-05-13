import { DeleteTeamsUseCase } from "../domain/useCases/deleteTeamsUseCase";
import { GetAllTeamsUseCase } from "../domain/useCases/getAllTeamsUseCase";
import { GetByUserTeamsUseCase } from "../domain/useCases/getByUserTeamsUseCase";
import { GetTeamsUseCase } from "../domain/useCases/getTeamsUseCase";
import { PutTeamsUseCase } from "../domain/useCases/putTeamsUseCase";
import { SaveTeamsUseCase } from "../domain/useCases/saveTeamsUseCase";
import { TeamsRepository } from "../repository/teamsController";

export class TeamsUseCasesController {
  delete: DeleteTeamsUseCase;
  get: GetTeamsUseCase;
  save: SaveTeamsUseCase;
  getAll: GetAllTeamsUseCase;
  getByUser: GetByUserTeamsUseCase
  put: PutTeamsUseCase;

  constructor(private repository: TeamsRepository) {
    this.delete = new DeleteTeamsUseCase(this.repository);
    this.get = new GetTeamsUseCase(this.repository);
    this.getByUser = new GetByUserTeamsUseCase(this.repository)
    this.save = new SaveTeamsUseCase(this.repository);
    this.getAll = new GetAllTeamsUseCase(this.repository);
    this.put = new PutTeamsUseCase(this.repository);
  }
}
