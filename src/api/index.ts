import axios from "axios";
import { SERVER_API_URL } from "../constants/api";
import { getToken } from "../helpers/asyncStorage";
import updateInfo from "../../update.json";

const $host = axios.create({
  baseURL: SERVER_API_URL,
});

const $authHost = axios.create({
  baseURL: SERVER_API_URL,
});

const unauthInterceptor = async (config: any) => {
  config.headers.authorization = `mobile:${updateInfo.versionName}`;
  return config;
};

const authInterceptor = async (config: any) => {
  config.headers.authorization = `Bearer ${await getToken()} mobile:${
    updateInfo.versionName
  }`;
  return config;
};

$host.interceptors.request.use(unauthInterceptor);
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
