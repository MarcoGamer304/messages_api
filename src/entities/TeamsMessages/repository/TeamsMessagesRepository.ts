import { ITeamsMessagesRepository } from "../domain/interfaces/ITeamsMessagesRepository";
import { TTeamsMessages } from "../domain/types/TTeamsMessages";
import { TTeamsMessagesEndpoint } from "../domain/types/TTeamsMessagesEndpoint";
import { TeamsMessagesService } from "../services/TeamsMessagesServices";

export class TeamsMessagesRepository implements ITeamsMessagesRepository {
  private static instance: TeamsMessagesRepository;
  private readonly teamsMessagesService = TeamsMessagesService.getInstance();

  public static getInstance(): TeamsMessagesRepository {
    if (!TeamsMessagesRepository.instance) {
      TeamsMessagesRepository.instance = new TeamsMessagesRepository();
    }
    return TeamsMessagesRepository.instance;
  }

  get = async (id: number): Promise<TTeamsMessagesEndpoint> => {
    return await this.teamsMessagesService.get(id);
  };

  getByUser = async (id: number): Promise<TTeamsMessagesEndpoint[]> => {
    return await this.teamsMessagesService.getByUser(id);
  };

  getAll = async (id: number): Promise<TTeamsMessagesEndpoint[]> => {
    return await this.teamsMessagesService.getAll(id);
  };

  save = async (data: TTeamsMessages): Promise<TTeamsMessagesEndpoint> => {
    return await this.teamsMessagesService.save(data);
  };

  delete = async (id: number): Promise<TTeamsMessagesEndpoint> => {
    return await this.teamsMessagesService.delete(id);
  };

  put = async (
    id: number,
    data: TTeamsMessages
  ): Promise<TTeamsMessagesEndpoint> => {
    return await this.teamsMessagesService.put(id, data);
  };
}
