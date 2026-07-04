package com.smartattendance.backend.service;

import com.smartattendance.backend.dto.request.AttendanceRequest;
import com.smartattendance.backend.dto.response.AttendanceResponse;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {

    List<AttendanceResponse> saveAttendance(AttendanceRequest request);

    List<AttendanceResponse> getAttendanceByDate(LocalDate date);

    List<AttendanceResponse> getAttendanceByStudent(Long studentId);

    void deleteAttendance(Long id);

    double calculateAttendancePercentage(Long studentId);

}