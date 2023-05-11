import AsyncStorage from "@react-native-async-storage/async-storage";
import { IShop } from "../models/api/IShop";

const TOKEN_KEY = "TOKEN_KEY";
const SHOP_KEY = "SHOP_KEY";

const setToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

const getToken = async (): Promise<string> => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token || "";
};

const setActiveShop = async (shop: IShop) => {
  await AsyncStorage.setItem(SHOP_KEY, JSON.stringify(shop));
};

const getActiveShop = async (): Promise<IShop | null> => {
  const shop = await AsyncStorage.getItem(SHOP_KEY);
  if (shop) {
    return JSON.parse(shop);
  } else {
    return null;
  }
};

export { setToken, getToken, setActiveShop, getActiveShop };
