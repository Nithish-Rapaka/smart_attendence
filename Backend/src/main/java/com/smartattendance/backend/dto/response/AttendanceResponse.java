package com.smartattendance.backend.dto.response;

import com.smartattendance.backend.enums.AttendanceStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AttendanceResponse {

    private Long id;

    private String rollNo;

    private LocalDate date;

    private AttendanceStatus status;

}