import { TEndpointMessage } from "../types/TEndpointMessage";
import { TMessage } from "../types/TMessage";

export interface IMessageServices {
  get: (id: number) => Promise<TEndpointMessage>;
  getByUser: (id: number) => Promise<TEndpointMessage[]>;
  save: (data: TMessage) => Promise<TEndpointMessage>;
  delete: (id: number) => Promise<TEndpointMessage>;
  put: (id: number, data: TMessage) => Promise<TEndpointMessage>;
}
