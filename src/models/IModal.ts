import { ITaskMessage } from './api/ITaskMessage';

export interface IModal {
  isShowing?: boolean;
}

export interface ITaskEditMessageModal extends IModal {
  taskMessage: ITaskMessage | null;
}
