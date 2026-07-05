import axiosInstance from "../services/axiosInstance";

export const updateEmail = async (email) => {
  const response = await axiosInstance.put("/profile/email", {
    email,
  });

  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await axiosInstance.put("/profile/password", passwordData);

  return response.data;
};
