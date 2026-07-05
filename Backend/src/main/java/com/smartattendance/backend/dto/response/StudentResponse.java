package com.smartattendance.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponse {

    private Long id;

    private String rollNo;

    private Long academicClassId;

    private String branch;

    private Integer year;

    private String section;
}