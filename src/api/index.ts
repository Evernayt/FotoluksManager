import axios from "axios";
import { SERVER_API_URL } from "../constants/api";
import { getToken } from "../helpers/asyncStorage";

const $host = axios.create({
  baseURL: SERVER_API_URL,
});

const $authHost = axios.create({
  baseURL: SERVER_API_URL,
});

const authInterceptor = async (config: any) => {
  config.headers.authorization = `Bearer ${await getToken()}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
