import { Request, Response } from "express";

export interface ITeamsController {
  get: (req: Request, res: Response) => Promise<any>;
  getByUser: (req: Request, res: Response) => Promise<any>;
  getAll: (req: Request, res: Response) => Promise<any>;
  save: (req: Request, res: Response) => Promise<any>;
  delete: (req: Request, res: Response) => Promise<any>;
  put: (req: Request, res: Response) => Promise<any>;
}
