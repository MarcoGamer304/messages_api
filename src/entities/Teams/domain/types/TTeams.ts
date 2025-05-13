import { TMember } from "./TMember";

export type TTeams = {
  name: string;
  members: TMember[] | null;
  createdAt: Date;
  updatedAt: Date;
};
