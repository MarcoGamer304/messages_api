import { TTeamsMessages } from "../types/TTeamsMessages";
import { TTeamsMessagesEndpoint } from "../types/TTeamsMessagesEndpoint";

export interface ITeamsMessagesRepository {
  get: (id: number) => Promise<TTeamsMessagesEndpoint>;
  getByUser: (id: number) => Promise<TTeamsMessagesEndpoint[]>;
  getAll: (id: number) => Promise<TTeamsMessagesEndpoint[]>;
  save: (data: TTeamsMessages) => Promise<TTeamsMessagesEndpoint>;
  put: (id: number, data: TTeamsMessages) => Promise<TTeamsMessagesEndpoint>;
  delete: (id: number) => Promise<TTeamsMessagesEndpoint>;
}
