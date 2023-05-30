import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GlobalMessageVariants,
  IGlobalMessage,
} from "../../models/IGlobalMessage";
import { IPushNotifications } from "../../models/IPushNotifications";
import { IUpdate } from "../../models/IUpdate";
import {
  INITIAL_CHECK_UPDATE,
  INITIAL_DOWNLOAD_UPDATE,
} from "../../constants/states/update-states";

type AppState = {
  globalMessage: IGlobalMessage;
  notificationsBadge: boolean;
  pushNotifications: IPushNotifications;
  checkUpdate: IUpdate;
  downloadUpdate: IUpdate;
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
  checkUpdate: INITIAL_CHECK_UPDATE,
  downloadUpdate: INITIAL_DOWNLOAD_UPDATE,
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
    setCheckUpdate(state, action: PayloadAction<IUpdate>) {
      state.checkUpdate.pending = action.payload.pending || false;
      state.checkUpdate.success = action.payload.success || false;
      state.checkUpdate.failure = action.payload.failure || false;
    },
    setDownloadUpdate(state, action: PayloadAction<IUpdate>) {
      state.downloadUpdate.pending = action.payload.pending || false;
      state.downloadUpdate.success = action.payload.success || false;
      state.downloadUpdate.failure = action.payload.failure || false;
    },
    clearState(state) {
      state.notificationsBadge = initialState.notificationsBadge;
    },
  },
});

export default appSlice.reducer;
