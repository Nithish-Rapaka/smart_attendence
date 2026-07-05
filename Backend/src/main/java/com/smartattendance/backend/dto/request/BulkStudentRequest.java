package com.smartattendance.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BulkStudentRequest {

    @NotBlank
    private String prefix;

    @NotNull
    private Integer startNumber;

    @NotNull
    private Integer endNumber;

    @NotNull
    private Long academicClassId;
}