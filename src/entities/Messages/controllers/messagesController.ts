import { IMessagesController } from "../domain/interfaces/IMessagesController";
import { MessagesRepository } from "../repository/messageController";
import { MessagesUseCasesController } from "./messagesUseCasesController";
import { Request, Response } from "express";

export class MessageController implements IMessagesController {
  private static instance: MessageController;

  public static getInstance(): MessageController {
    if (!MessageController.instance) {
      MessageController.instance = new MessageController();
    }
    return MessageController.instance;
  }

  private readonly useCases = new MessagesUseCasesController(MessagesRepository.getInstance());

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
