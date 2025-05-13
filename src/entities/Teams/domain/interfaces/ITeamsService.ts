import { TEndpointTeams } from "../types/TEndpointTeams";
import { TTeams } from "../types/TTeams";

export interface ITeamsService {
  get: (id: number) => Promise<TEndpointTeams>;
  getByUser: (id: number) => Promise<TEndpointTeams[]>;
  getAll: () => Promise<TEndpointTeams[]>;
  save: (data: TTeams) => Promise<TEndpointTeams>;
  delete: (id: number) => Promise<TEndpointTeams>;
  put: (id: number, data: TTeams) => Promise<TEndpointTeams>;
}
