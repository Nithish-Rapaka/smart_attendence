import axiosInstance from "../services/axiosInstance";

// Save Attendance
export const saveAttendance = async (attendance) => {
  const response = await axiosInstance.post("/admin/attendance", attendance);
  return response.data;
};

// View Attendance By Date
export const getAttendanceByDate = async (date) => {
  const response = await axiosInstance.get(`/teacher/attendance/date/${date}`);
  return response.data;
};

// Attendance Percentage
export const getAttendancePercentage = async (studentId) => {
  const response = await axiosInstance.get(
    `/teacher/attendance/percentage/${studentId}`,
  );
  return response.data;
};

// Attendance Summary
export const getAttendanceSummary = async (academicClassId) => {
  const response = await axiosInstance.get(
    `/teacher/attendance/summary/${academicClassId}`,
  );

  return response.data;
};

export const updateAttendance = async (attendance) => {
  const response = await axiosInstance.put("/teacher/attendance", attendance);

  return response.data;
};

export const getAttendanceByClassAndDate = async (classId, date) => {
  const response = await axiosInstance.get(
    `/teacher/attendance/class/${classId}/date/${date}`,
  );

  return response.data;
};


