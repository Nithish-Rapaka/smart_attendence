import axiosInstance from "../services/axiosInstance";

export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/teacher/dashboard/stats");
  return response.data;
};
