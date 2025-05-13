import { TMember } from "./TMember";

export type TEndpointTeams = {
  id: number;
  name: string;
  members: TMember[] | null;
  createdAt: Date;
  updatedAt: Date;
};
