package com.smartattendance.backend.controller;

import com.smartattendance.backend.dto.response.AttendanceResponse;
import com.smartattendance.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/teacher/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherAttendanceController {

    private final AttendanceService attendanceService;

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
}