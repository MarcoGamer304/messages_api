import { ITeamsController } from "../domain/interfaces/ITeamsController";
import { TeamsRepository } from "../repository/teamsController";
import { TeamsUseCasesController } from "./teamsUseCasesController";
import { Request, Response } from "express";

export class TeamsController implements ITeamsController {
  private static instance: TeamsController;

  public static getInstance(): TeamsController {
    if (!TeamsController.instance) {
      TeamsController.instance = new TeamsController();
    }
    return TeamsController.instance;
  }

  private readonly useCases = new TeamsUseCasesController(
    TeamsRepository.getInstance()
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
      const result = await this.useCases.getAll.execute();
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
