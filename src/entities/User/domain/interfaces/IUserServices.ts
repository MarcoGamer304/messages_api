import { TUserEndpoint } from "../types/TUserEndpoint";

export interface IUserServices {
  get: (id: number) => Promise<TUserEndpoint[]>;
}
