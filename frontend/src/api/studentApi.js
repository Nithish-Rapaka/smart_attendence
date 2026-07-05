import axiosInstance from "../services/axiosInstance";

export const getAllStudents = async () => {
  const response = await axiosInstance.get("/teacher/students");
  return response.data;
};

export const addStudent = async (student) => {
  const response = await axiosInstance.post("/admin/students", student);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(`/admin/students/${id}`);
  return response.data;
};

export const bulkGenerateStudents = async (data) => {
  const response = await axiosInstance.post("/admin/students/bulk", data);
  return response.data;
};

// studentApi.js
export const updateStudent = async (id, student) => {
  const response = await axiosInstance.put(`/teacher/students/${id}`, student);

  return response.data;
};
