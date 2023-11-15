import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_TASK_EDIT_MESSAGE_MODAL } from "../../constants/states/modal-states";
import { ITaskEditMessageModal } from "../../models/IModal";

type ModalState = {
  taskEditMessageModal: ITaskEditMessageModal;
};

const initialState: ModalState = {
  taskEditMessageModal: INITIAL_TASK_EDIT_MESSAGE_MODAL,
};

interface OpenModalProps<K = keyof ModalState> {
  modal: K;
  //@ts-ignore
  props?: ModalState[K];
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<OpenModalProps>) {
      //@ts-ignore
      state[action.payload.modal] = {
        ...action.payload.props,
        isShowing: true,
      };
    },
    closeModal(state, action: PayloadAction<keyof ModalState>) {
      //@ts-ignore
      state[action.payload] = initialState[action.payload];
    },
  },
});

export default modalSlice.reducer;
