import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./reducers/AppSlice";
import EmployeeSlice from "./reducers/EmployeeSlice";
import TaskSlice from "./reducers/TaskSlice";
import OrderSlice from "./reducers/OrderSlice";
import ModalSlice from "./reducers/ModalSlice";
//import ControlPanelSlice from './reducers/ControlPanelSlice';

const store = configureStore({
  reducer: {
    app: AppSlice,
    employee: EmployeeSlice,
    task: TaskSlice,
    order: OrderSlice,
    modal: ModalSlice,
    //controlPanel: ControlPanelSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
