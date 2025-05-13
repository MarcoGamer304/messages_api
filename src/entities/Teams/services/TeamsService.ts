import { where } from "sequelize";
import { ITeamsService } from "../domain/interfaces/ITeamsService";
import Teams from "../domain/models/TeamsModel";
import { TEndpointTeams } from "../domain/types/TEndpointTeams";
import { TTeams } from "../domain/types/TTeams";
import { Op, literal } from "sequelize";

export class TeamsService implements ITeamsService {
  private static instance: TeamsService;

  public static getInstance(): TeamsService {
    if (!TeamsService.instance) {
      TeamsService.instance = new TeamsService();
    }
    return TeamsService.instance;
  }

  get = async (id: number): Promise<TEndpointTeams> => {
    const team = await Teams.findByPk(id);
    if (!team) {
      throw new Error("team not found");
    }
    return team;
  };

  getByUser = async (id: number): Promise<TEndpointTeams[]> => {
    const teams = await Teams.findAll({
      where: literal(`JSON_CONTAINS(members, JSON_OBJECT('id', ${id}))`)
    });
    if (teams.length === 0) {
      throw new Error("user dont have teams");
    }
    return teams;
  };

  getAll = async (): Promise<TEndpointTeams[]> => {
    const teams = await Teams.findAll();
    if (!teams) {
      throw new Error("teams not found");
    }
    return teams;
  };

  save = async (data: TTeams): Promise<TEndpointTeams> => {
    const exist = await Teams.findOne({ where: { name: data.name } });
    if (exist) {
      throw new Error("Cannot name two teams whit the same name");
    }
    const team = await Teams.create(data);
    if (!team) {
      throw new Error("team not CREATED");
    }
    return team;
  };

  delete = async (id: number): Promise<TEndpointTeams> => {
    const team = await Teams.findByPk(id);
    if (!team) {
      throw new Error("team not found");
    }
    await team.destroy();
    return team;
  };

  put = async (id: number, data: TTeams): Promise<TEndpointTeams> => {
    const team = await Teams.findByPk(id);
    if (!team) {
      throw new Error("team not found");
    }
    await team.update(data);
    return await this.get(id);
  };
}
