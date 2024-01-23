import { IData } from "../IData";

export interface IRole {
  id: number;
  name: string;
  accessLevel: number;
}

export type IRoleData = IData<IRole[]>;
