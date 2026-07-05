package com.smartattendance.backend.dto.response;

import com.smartattendance.backend.enums.AttendanceStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentAttendanceResponse {

    private Long studentId;

    private String rollNo;

    private AttendanceStatus status;
}