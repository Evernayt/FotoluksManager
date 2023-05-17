import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPushNotifications } from "../models/IPushNotifications";

const TOKEN_KEY = "TOKEN_KEY";
const PUSH_NOTIFICATIONS_KEY = "PUSH_NOTIFICATIONS_KEY";

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

export { setToken, getToken, setPushNotifications, getPushNotifications };
