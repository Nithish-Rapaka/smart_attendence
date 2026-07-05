import axiosInstance from "../services/axiosInstance";

export const getAllClasses = async () => {
  const response = await axiosInstance.get("/teacher/classes");
  return response.data;
};

export const addClass = async (academicClass) => {
  const response = await axiosInstance.post("/admin/classes", academicClass);
  return response.data;
};

export const deleteClass = async (id) => {
  const response = await axiosInstance.delete(`/admin/classes/${id}`);
  return response.data;
};
