package com.smartattendance.backend.dto.response;
import lombok.Builder;
import lombok.Data;
import java.util.List;
@Data
@Builder
public class AttendanceReportResponse {
    private int totalStudents;
    private int present;
    private int absent;
    private double attendancePercentage;
    private List<StudentAttendanceResponse> students;
}