import { ITeamsMessagesController } from "../domain/interfaces/ITeamsMessagesController";
import { TeamsMessagesRepository } from "../repository/TeamsMessagesRepository";
import { TeamsMessagesUseCasesController } from "./teamsMessagesUseCasesController";
import { Request, Response } from "express";

export class TeamsMessagesController implements ITeamsMessagesController {
  private static instance: TeamsMessagesController;

  public static getInstance(): TeamsMessagesController {
    if (!TeamsMessagesController.instance) {
      TeamsMessagesController.instance = new TeamsMessagesController();
    }
    return TeamsMessagesController.instance;
  }

  private teamsMessagesRepository = TeamsMessagesRepository.getInstance();
  private useCases = new TeamsMessagesUseCasesController(
    this.teamsMessagesRepository
  );

  get = async (req: Request, res: Response) => {
    try {
      const result = await this.useCases.get.execute(Number(req.params.id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      const result = await this.useCases.getByUser.execute(
        Number(req.params.id)
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.useCases.getAll.execute(Number(req.params.id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  save = async (req: Request, res: Response) => {
    try {
      const result = await this.useCases.save.execute(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.useCases.delete.execute(Number(req.params.id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  put = async (req: Request, res: Response) => {
    try {
      const result = await this.useCases.put.execute(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
