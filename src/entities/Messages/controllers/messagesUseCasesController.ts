import { DeleteMessagesUseCase } from "../domain/useCases/deleteMessagesUseCase";
import { GetAllMessagesUseCase } from "../domain/useCases/getAllMessagesUseCase";
import { GetMessagesUseCase } from "../domain/useCases/getMessagesUseCase";
import { PutMessagesUseCase } from "../domain/useCases/putMessagesUseCase";
import { SaveMessagesUseCase } from "../domain/useCases/saveMessagesUseCase";
import { MessagesRepository } from "../repository/messagesRepository";

export class MessagesUseCasesController {
  delete: DeleteMessagesUseCase;
  get: GetMessagesUseCase;
  save: SaveMessagesUseCase;
  getAll: GetAllMessagesUseCase;
  put: PutMessagesUseCase;

  constructor(private readonly repository: MessagesRepository) {
    this.delete = new DeleteMessagesUseCase(this.repository);
    this.get = new GetMessagesUseCase(this.repository);
    this.save = new SaveMessagesUseCase(this.repository);
    this.getAll = new GetAllMessagesUseCase(this.repository);
    this.put = new PutMessagesUseCase(this.repository)
  }
}
