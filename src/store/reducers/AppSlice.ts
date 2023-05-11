import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "../../models/api/IShop";
import {
  GlobalMessageVariants,
  IGlobalMessage,
} from "../../models/IGlobalMessage";
import { INITIAL_SHOP } from "../../constants/states/shop-states";

type AppState = {
  shops: IShop[];
  activeShop: IShop;
  globalMessage: IGlobalMessage;
  notificationsBadge: boolean;
};

const initialState: AppState = {
  shops: [],
  activeShop: INITIAL_SHOP,
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
    setShops(state, action: PayloadAction<IShop[]>) {
      state.shops = action.payload;
    },
    setActiveShop(state, action: PayloadAction<IShop>) {
      state.activeShop = action.payload;
    },
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
