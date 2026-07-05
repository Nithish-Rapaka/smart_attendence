package com.smartattendance.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AcademicClassResponse {

    private Long id;

    private String branch;

    private Integer year;

    private String section;
}