import axiosInstance from "../services/axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);

  return response.data;
};

export const register = async (user) => {
  const response = await axiosInstance.post("/auth/register", user);

  return response.data;
};
