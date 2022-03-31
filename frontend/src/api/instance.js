import { getToken, isTokenExpired, removeUserSession, logout } from "../services/auth";
import axios from "axios";
import {urlApi} from "../config";

let instance = axios.create({
  baseURL: urlApi,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: false, // for CORS
});
// Se establece un token auth para realizar las solicitudes
instance.interceptors.request.use(function (config) {
  const token = getToken();
  if (isTokenExpired()) {
    removeUserSession();
    window.reload("/");
    return false;
  } else {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  }
});
export default instance;
