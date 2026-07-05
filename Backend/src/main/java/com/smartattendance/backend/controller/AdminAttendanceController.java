package com.smartattendance.backend.controller;

import com.smartattendance.backend.dto.request.AttendanceRequest;
import com.smartattendance.backend.dto.response.AttendanceResponse;
import com.smartattendance.backend.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminAttendanceController {

    private final AttendanceService attendanceService;
    // Delete Attendance
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return ResponseEntity.ok("Attendance Deleted Successfully");
    }

    @PostMapping
    public ResponseEntity<List<AttendanceResponse>> saveAttendance(
            @Valid @RequestBody AttendanceRequest request) {

        System.out.println("Inside saveAttendance Controller");

        return ResponseEntity.ok(attendanceService.saveAttendance(request));
    }
}