import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // TESTE
  config.headers["x-tenant-id"] =
    localStorage.getItem("@tenantId") ||
    "3f8d2c5f-4a91-4fd0-b332-11f6e2f5d222";

  return config;
});