import { DeleteTeamsMessagesUseCase } from "../domain/useCases/deleteTeamsMessagesUseCase";
import { GetAllTeamsMessagesUseCase } from "../domain/useCases/getAllTeamsMessagesUseCase";
import { GetByUserTeamsMessagesUseCase } from "../domain/useCases/getByUserTeamsMessagesUseCase";
import { GetTeamsMessagesUseCase } from "../domain/useCases/getTeamsMessagesUseCase";
import { PutTeamsMessagesUseCase } from "../domain/useCases/putTeamsMessagesUseCase";
import { SaveTeamsMessagesUseCase } from "../domain/useCases/saveTeamsMessagesUseCase";
import { TeamsMessagesRepository } from "../repository/TeamsMessagesRepository";

export class TeamsMessagesUseCasesController {
  delete: DeleteTeamsMessagesUseCase;
  get: GetTeamsMessagesUseCase;
  save: SaveTeamsMessagesUseCase;
  getAll: GetAllTeamsMessagesUseCase;
  getByUser: GetByUserTeamsMessagesUseCase;
  put: PutTeamsMessagesUseCase;

  constructor(private repository: TeamsMessagesRepository) {
    this.delete = new DeleteTeamsMessagesUseCase(this.repository);
    this.get = new GetTeamsMessagesUseCase(this.repository);
    this.getByUser = new GetByUserTeamsMessagesUseCase(this.repository);
    this.save = new SaveTeamsMessagesUseCase(this.repository);
    this.getAll = new GetAllTeamsMessagesUseCase(this.repository);
    this.put = new PutTeamsMessagesUseCase(this.repository);
  }
}
