package com.smartattendance.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AttendanceRequest {

    @NotNull
    private Long academicClassId;

    @NotNull
    private LocalDate date;

    @NotNull
    private List<AttendanceItemRequest> attendance;

}