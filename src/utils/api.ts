import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
});

export const fetchUsers = () => api.get("/users");
export const fetchUser = (id: number) => api.get(`/users/${id}`);

export {};
