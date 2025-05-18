import { UserRepository } from "../../repository/userController";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number) {
    return await this.userRepository.get(id);
  }
}
