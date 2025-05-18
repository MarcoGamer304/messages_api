import { ITeamsMessagesService } from "../domain/interfaces/ITeamsMessagesService";
import TeamsMessages from "../domain/models/TeamsMessagesModel";
import { TTeamsMessages } from "../domain/types/TTeamsMessages";
import { TTeamsMessagesEndpoint } from "../domain/types/TTeamsMessagesEndpoint";

export class TeamsMessagesService implements ITeamsMessagesService {
  private static instance: TeamsMessagesService;

  public static getInstance(): TeamsMessagesService {
    if (!TeamsMessagesService.instance) {
      TeamsMessagesService.instance = new TeamsMessagesService();
    }
    return TeamsMessagesService.instance;
  }

  get = async (id: number): Promise<TTeamsMessagesEndpoint> => {
    const teamsMessage = await TeamsMessages.findByPk(id);
    if (!teamsMessage) {
      throw new Error("message not found");
    }
    return teamsMessage;
  };

  getByUser = async (id: number): Promise<TTeamsMessagesEndpoint[]> => {
    const teamsMessage = await TeamsMessages.findAll({
      where: {
        sender_id: id,
      },
    });
    return teamsMessage;
  };

  getAll = async (id: number): Promise<TTeamsMessagesEndpoint[]> => {
    const teamsMessage = await TeamsMessages.findAll({
      where: {
        groupId: id,
      },
    });
    return teamsMessage;
  };

  save = async (data: TTeamsMessages): Promise<TTeamsMessagesEndpoint> => {
    const teamsMessage = await TeamsMessages.create(data);
    if (!teamsMessage) {
      throw new Error("message not found");
    }
    return teamsMessage;
  };

  delete = async (id: number): Promise<TTeamsMessagesEndpoint> => {
    const teamsMessage = await TeamsMessages.findByPk(id);
    if (!teamsMessage) {
      throw new Error("message not found");
    }
    await teamsMessage.destroy();
    return teamsMessage;
  };

  put = async (
    id: number,
    data: TTeamsMessages
  ): Promise<TTeamsMessagesEndpoint> => {
    const teamsMessage = await TeamsMessages.findByPk(id);
    if (!teamsMessage) {
      throw new Error("message not found");
    }
    await teamsMessage.update(data);
    return await this.get(id);
  };
}
