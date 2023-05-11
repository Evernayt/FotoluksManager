import { IData } from '../IData';

export interface IStatus {
  id: number;
  name: string;
  color: string;
  //ordersCount?: number;
}

export type IStatusData = IData<IStatus[]>;
