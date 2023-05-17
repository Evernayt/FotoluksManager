import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "../../models/api/IEmployee";
import { INotification } from "../../models/api/INotification";

type EmployeeState = {
  employee: IEmployee | null;
  notifications: INotification[];
  notificationsPage: number;
  notificationsPageCount: number;
};

const initialState: EmployeeState = {
  employee: null,
  notifications: [],
  notificationsPage: 1,
  notificationsPageCount: 1,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<IEmployee>) {
      state.employee = action.payload;
    },
    addNotifications(state, action: PayloadAction<INotification[]>) {
      state.notifications.push(...action.payload);
    },
    addNotification(state, action: PayloadAction<INotification>) {
      state.notifications.unshift(action.payload);
      state.notifications.pop();
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    updateEmployee(state, action: PayloadAction<IEmployee>) {
      state.employee = action.payload;
    },
    setNotificationsPage(state, action: PayloadAction<number>) {
      state.notificationsPage = action.payload;
    },
    setNotificationsPageCount(state, action: PayloadAction<number>) {
      state.notificationsPageCount = action.payload;
    },
    clearState() {
      return initialState;
    },
  },
});

export default employeeSlice.reducer;
