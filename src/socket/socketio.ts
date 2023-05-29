import { io, Socket } from "socket.io-client";
import { SERVER_API_URL } from "../constants/api";
import { INotification } from "../models/api/INotification";

let socket: Socket;

const connect = () => {
  socket = io(SERVER_API_URL);
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
