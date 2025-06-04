import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://note-app-server-x9lx.onrender.com",
});