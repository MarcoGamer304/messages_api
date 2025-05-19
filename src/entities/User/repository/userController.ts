import { IUserRepository } from "../domain/interfaces/IUserRepository";
import { TUserEndpoint } from "../domain/types/TUserEndpoint";
import { UserService } from "../services/userService";

export class UserRepository implements IUserRepository {
  private static instance: UserRepository;
  private readonly userService = UserService.getInstance();

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  get = async (id: number): Promise<TUserEndpoint[]> => {
    return await this.userService.get(id);
  };
}
