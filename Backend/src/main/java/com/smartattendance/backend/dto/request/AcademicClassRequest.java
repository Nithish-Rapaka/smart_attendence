package com.smartattendance.backend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AcademicClassRequest {

    @NotBlank(message = "Branch is required")
    private String branch;

    @NotNull(message = "Year is required")
    @Min(1)
    @Max(4)
    private Integer year;

    @NotBlank(message = "Section is required")
    private String section;
}