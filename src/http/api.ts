import axios from "axios";
import useTokenStore from "../store/app.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role:string;
}) => api.post("/auth/register", data);

export const getBooks = async () => api.get("/api/books");

export const createBook = async (data: FormData) =>
  api.post("/api/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
