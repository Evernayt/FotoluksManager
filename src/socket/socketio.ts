import { io, Socket } from "socket.io-client";
import { SERVER_API_URL } from "../constants/api";
import { INotification } from "../models/api/INotification";
import store from "../store";

let socket: Socket;

const connect = (employeeId: number) => {
  socket = io(SERVER_API_URL);

  socket.emit('addEmployee', employeeId);
};

const disconnect = () => {
  socket?.disconnect();
};

const isConnected = () => {
  if (socket) {
    return true;
  } else {
    const employee = store.getState().employee.employee;
    connect(employee?.id || 0);
    return false;
  }
};

const sendNotification = (
  notification: INotification,
  employeeIds: number[]
) => {
  if (!isConnected()) return;
  socket.emit("sendNotification", { notification, employeeIds });
};

export default {
  connect,
  disconnect,
  sendNotification,
};
