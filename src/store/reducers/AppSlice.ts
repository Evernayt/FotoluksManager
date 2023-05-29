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
    addedOrRemovedFromMembers: { value: true, id: 1 },
    taskComments: { value: true, id: 2 },
    taskStatusChanged: { value: true, id: 3 },
    orderStatusChanged: { value: false, id: 4 },
    orderChanged: { value: false, id: 5 },
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
