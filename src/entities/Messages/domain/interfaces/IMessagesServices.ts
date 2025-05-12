import { IEndpointMessage } from "../types/IEndpointMessage";
import { TMessage } from "../types/TMessage";

export interface IMessageServices {
  get: (id: number) => Promise<IEndpointMessage>;
  getByUser: (id: number) => Promise<IEndpointMessage[]>;
  save: (data: TMessage) => Promise<IEndpointMessage>;
  delete: (id: number) => Promise<IEndpointMessage>;
  put: (id: number, data: TMessage) => Promise<IEndpointMessage>;
}
