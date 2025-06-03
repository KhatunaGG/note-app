import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3003",
  baseURL: "https://note-app-server-x9lx.onrender.com",
});