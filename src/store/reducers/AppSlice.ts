import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GlobalMessageVariants,
  IGlobalMessage,
} from "../../models/IGlobalMessage";
import { IPushNotifications } from "../../models/IPushNotifications";

type AppState = {
  globalMessage: IGlobalMessage;
  notificationsBadge: boolean;
  pushNotifications: IPushNotifications;
};

const initialState: AppState = {
  globalMessage: {
    message: "",
    variant: GlobalMessageVariants.success,
    isShowing: false,
  },
  notificationsBadge: false,
  pushNotifications: {
    addedOrRemovedFromMembers: { value: true },
    taskComments: { value: true },
    taskStatusChanged: { value: true },
    orderStatusChanged: { value: false },
    orderChanged: { value: false },
  },
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
    setPushNotifications(state, action: PayloadAction<IPushNotifications>) {
      state.pushNotifications = action.payload;
    },
    clearState(state) {
      state.notificationsBadge = initialState.notificationsBadge;
    },
  },
});

export default appSlice.reducer;
