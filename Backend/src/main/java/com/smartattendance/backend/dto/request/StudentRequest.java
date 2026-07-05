package com.smartattendance.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StudentRequest {

    @NotBlank(message = "Roll Number is required")
    private String rollNo;

    @NotNull(message = "Academic Class Id is required")
    private Long academicClassId;
}