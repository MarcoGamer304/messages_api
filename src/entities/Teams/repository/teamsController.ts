import { ITeamsRepository } from "../domain/interfaces/ITeamsRepository";
import { TEndpointTeams } from "../domain/types/TEndpointTeams";
import { TTeams } from "../domain/types/TTeams";
import { TeamsService } from "../services/TeamsService";

export class TeamsRepository implements ITeamsRepository {
  private static instance: TeamsRepository;
  private teamsService = TeamsService.getInstance();

  public static getInstance(): TeamsRepository {
    if (!TeamsRepository.instance) {
      TeamsRepository.instance = new TeamsRepository();
    }
    return TeamsRepository.instance;
  }

  get = async (id: number): Promise<TEndpointTeams> => {
    return await this.teamsService.get(id);
  };

  getByUser = async (id: number): Promise<TEndpointTeams[]> => {
    return await this.teamsService.getByUser(id);
  };

  getAll = async (): Promise<TEndpointTeams[]> => {
    return await this.teamsService.getAll();
  };

  save = async (data: TTeams): Promise<TEndpointTeams> => {
    return await this.teamsService.save(data);
  };

  delete = async (id: number): Promise<TEndpointTeams> => {
    return await this.teamsService.delete(id);
  };

  put = async (id: number, data: TTeams): Promise<TEndpointTeams> => {
    return await this.teamsService.put(id, data);
  };
}
