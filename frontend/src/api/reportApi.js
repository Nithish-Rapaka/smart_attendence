import axiosInstance from "../services/axiosInstance";

export const getAttendanceReport = async (academicClassId, date) => {
  const response = await axiosInstance.get(
    `/teacher/attendance/report?academicClassId=${academicClassId}&date=${date}`,
  );

  return response.data;
};
