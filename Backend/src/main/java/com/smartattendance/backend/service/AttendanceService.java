package com.smartattendance.backend.service;
import com.smartattendance.backend.dto.response.AttendanceSummaryResponse;
import com.smartattendance.backend.dto.request.AttendanceRequest;
import com.smartattendance.backend.dto.response.AttendanceResponse;
import com.smartattendance.backend.dto.response.AttendanceReportResponse;
import java.time.LocalDate;
import java.util.List;
import com.smartattendance.backend.dto.response.AttendanceSummaryResponse;

public interface AttendanceService {

    List<AttendanceResponse> saveAttendance(AttendanceRequest request);

    List<AttendanceResponse> getAttendanceByDate(LocalDate date);

    List<AttendanceResponse> getAttendanceByStudent(Long studentId);

    void deleteAttendance(Long id);

    double calculateAttendancePercentage(Long studentId);
    List<AttendanceResponse> getAttendanceByClassAndDate(
            Long classId,
            LocalDate date
    );
    AttendanceReportResponse getAttendanceReport(
            Long academicClassId,
            LocalDate date
    );
    AttendanceSummaryResponse getClassAttendanceSummary(Long academicClassId);
    List<AttendanceResponse> updateAttendance(AttendanceRequest request);
}