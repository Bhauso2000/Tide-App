// src/api/axios.ts
import axios from "axios";
import { WORLD_TIDES_BASE, API_KEY } from "../constants/constants";

const api = axios.create({
  baseURL: WORLD_TIDES_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (API_KEY) {
    config.params = { ...(config.params || {}), key: API_KEY };
  }
  return config;
});

export default api;
