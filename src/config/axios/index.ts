import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.POKE_URL ?? "https://pokeapi.co/api/v2",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data as any;
  },
  (error) => {
    return Promise.reject(error);
  }
);