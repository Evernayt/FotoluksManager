import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "../../models/api/IShop";
import {
  GlobalMessageVariants,
  IGlobalMessage,
} from "../../models/IGlobalMessage";

type AppState = {
  globalMessage: IGlobalMessage;
  notificationsBadge: boolean;
};

const initialState: AppState = {
  globalMessage: {
    message: "",
    variant: GlobalMessageVariants.success,
    isShowing: false,
  },
  notificationsBadge: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGlobalMessage(state, action: PayloadAction<IGlobalMessage>) {
      state.globalMessage = action.payload;
    },
    setNoificationsBadge(state, action: PayloadAction<boolean>) {
      state.notificationsBadge = action.payload;
    },
    clearState(state) {
      state.notificationsBadge = initialState.notificationsBadge;
    },
  },
});

export default appSlice.reducer;
