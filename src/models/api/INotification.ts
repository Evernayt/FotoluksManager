import { IData } from "../IData";
import { IApp } from "./IApp";
import { INotificationCategory } from "./INotificationCategory";

export interface INotification {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  appId?: number;
  notificationCategoryId?: number;
  app?: IApp;
  notificationCategory?: INotificationCategory;
}

export type INotificationData = IData<INotification[]>;
