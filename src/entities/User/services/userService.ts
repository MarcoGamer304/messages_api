import User from "../domain/models/UserModel";
import { IUserServices } from "../domain/interfaces/IUserServices";
import { TUserEndpoint } from "../domain/types/TUserEndpoint";

export class UserService implements IUserServices {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  get = async (id: number): Promise<TUserEndpoint> => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  };
}
