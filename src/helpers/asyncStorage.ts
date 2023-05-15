import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "TOKEN_KEY";

const setToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

const getToken = async (): Promise<string> => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token || "";
};

export { setToken, getToken };
