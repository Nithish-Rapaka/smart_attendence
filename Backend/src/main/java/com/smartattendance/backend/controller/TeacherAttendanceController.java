package com.smartattendance.backend.controller;
import com.smartattendance.backend.dto.request.AttendanceRequest;
import com.smartattendance.backend.dto.response.AttendanceReportResponse;
import com.smartattendance.backend.dto.response.AttendanceResponse;
import com.smartattendance.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smartattendance.backend.dto.response.AttendanceSummaryResponse;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/teacher/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherAttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/class/{classId}/date/{date}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByClassAndDate(
            @PathVariable Long classId,
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByClassAndDate(classId, date)
        );
    }

    @GetMapping("/report")
    public ResponseEntity<AttendanceReportResponse> getAttendanceReport(
            @RequestParam Long academicClassId,
            @RequestParam LocalDate date) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceReport(academicClassId, date)
        );
    }
    // Get Attendance By Date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByDate(
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(attendanceService.getAttendanceByDate(date));
    }

    // Get Student Attendance History
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByStudent(studentId)
        );
    }

    // Attendance Percentage
    @GetMapping("/percentage/{studentId}")
    public ResponseEntity<Double> getAttendancePercentage(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                attendanceService.calculateAttendancePercentage(studentId)
        );
    }

    @GetMapping("/summary/{academicClassId}")
    public ResponseEntity<AttendanceSummaryResponse> getClassAttendanceSummary(
            @PathVariable Long academicClassId) {

        return ResponseEntity.ok(
                attendanceService.getClassAttendanceSummary(academicClassId)
        );
    }

    @PutMapping
    public ResponseEntity<List<AttendanceResponse>> updateAttendance(
            @RequestBody AttendanceRequest request) {

        return ResponseEntity.ok(
                attendanceService.updateAttendance(request)
        );
    }
}