import { SERVER_API_URL } from "../constants/api";
import { INotification } from "../models/api/INotification";
import { IOrder } from "../models/api/IOrder";
import { IWatcher } from "../models/IWatcher";
import { io, Socket } from "socket.io-client";
import store from "../store";
import { appSlice } from "../store/reducers/AppSlice";
import { employeeSlice } from "../store/reducers/EmployeeSlice";
//import { orderSlice } from "../store/reducers/OrderSlice";

let socket: Socket;

const connect = () => {
  socket = io(SERVER_API_URL);

  subscribeToNotifications();
  subscribeToOrderUpdates();
  subscribeToWatchers();
};

const disconnect = () => {
  socket?.disconnect();
};

const isConnected = () => {
  if (socket) {
    return true;
  } else {
    connect();
    return false;
  }
};

const subscribeToNotifications = () => {
  socket.on("getNotification", (notification: INotification) => {
    store.dispatch(employeeSlice.actions.addNotification(notification));
    store.dispatch(appSlice.actions.setNoificationsBadge(true));
  });
};

const subscribeToOrderUpdates = () => {
  // socket.on("getOrder", (order: IOrder) => {
  //   store.dispatch(orderSlice.actions.updateOrder(order));
  // });
};

const subscribeToWatchers = () => {
  // socket.on("getWatchers", (watchers: IWatcher[]) => {
  //   store.dispatch(orderSlice.actions.setWatchers(watchers));
  // });
};

const sendNotification = (notification: INotification) => {
  if (!isConnected()) return;
  socket.emit("sendNotification", notification);
};

const updateOrder = (order: IOrder) => {
  if (!isConnected()) return;
  socket.emit("updateOrder", order);
};

const addWatcher = (watcher: IWatcher) => {
  if (!isConnected()) return;
  socket.emit("addWatcher", watcher);
};

const removeWatcher = (userId: number) => {
  // if (!isConnected()) return;
  // socket.emit("removeWatcher", userId);
  // store.dispatch(orderSlice.actions.setWatchers([]));
};

export default {
  connect,
  disconnect,
  sendNotification,
  updateOrder,
  addWatcher,
  removeWatcher,
};
