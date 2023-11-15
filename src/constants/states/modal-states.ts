import { ITaskEditMessageModal, IModal } from "../../models/IModal";

export const INITIAL_MODAL: IModal = {
  isShowing: false,
};

export const INITIAL_TASK_EDIT_MESSAGE_MODAL: ITaskEditMessageModal = {
  ...INITIAL_MODAL,
  taskMessage: null,
};
