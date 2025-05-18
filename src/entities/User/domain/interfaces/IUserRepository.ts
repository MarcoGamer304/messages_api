import { TUserEndpoint } from "../types/TUserEndpoint";

export interface IUserRepository {
  get: (id: number) => Promise<TUserEndpoint[]>;
}
