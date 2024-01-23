import { IData } from "../IData";

export interface IStatus {
  id: number;
  name: string;
  color: string;
}

export type IStatusData = IData<IStatus[]>;
