import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPushNotifications } from "../models/IPushNotifications";
import { IEmployee } from "../models/api/IEmployee";

const TOKEN_KEY = "TOKEN_KEY";
const PUSH_NOTIFICATIONS_KEY = "PUSH_NOTIFICATIONS_KEY";
const EMPLOYEE_KEY = "EMPLOYEE_KEY";

const setToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

const getToken = async (): Promise<string> => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token || "";
};

const setPushNotifications = async (pushNotifications: IPushNotifications) => {
  await AsyncStorage.setItem(
    PUSH_NOTIFICATIONS_KEY,
    JSON.stringify(pushNotifications)
  );
};

const getPushNotifications = async (): Promise<IPushNotifications | null> => {
  const data = await AsyncStorage.getItem(PUSH_NOTIFICATIONS_KEY);
  const pushNotifications = JSON.parse(data || "{}");
  if (Object.keys(pushNotifications).length) {
    return pushNotifications;
  } else {
    return null;
  }
};

const setEmployee = async (employee: IEmployee) => {
  await AsyncStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employee));
};

const getEmployee = async (): Promise<IEmployee | null> => {
  const data = await AsyncStorage.getItem(EMPLOYEE_KEY);
  const employee = JSON.parse(data || "{}");
  if (Object.keys(employee).length) {
    return employee;
  } else {
    return null;
  }
};

export {
  setToken,
  getToken,
  setPushNotifications,
  getPushNotifications,
  setEmployee,
  getEmployee,
};
