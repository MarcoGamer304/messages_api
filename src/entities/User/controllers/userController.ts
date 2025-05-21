import { IUserController } from "../domain/interfaces/IUserController";
import { UserRepository } from "../repository/userRepository";
import { GetUserUseCase } from "../domain/useCases/getUserUseCase";
import { Request, Response } from "express";

export class UserController implements IUserController {
  private static instance: UserController;

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  private readonly useCases = new GetUserUseCase(UserRepository.getInstance());

  get = async (req: Request, res: Response) => {
    try {
      const result = await this.useCases.execute(Number(req.params.id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}
