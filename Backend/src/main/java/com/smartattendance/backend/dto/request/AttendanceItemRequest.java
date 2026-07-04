package com.smartattendance.backend.dto.request;

import com.smartattendance.backend.enums.AttendanceStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AttendanceItemRequest {

    @NotNull
    private Long studentId;

    @NotNull
    private AttendanceStatus status;

}