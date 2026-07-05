package com.smartattendance.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentReportResponse {

    private Long studentId;

    private String rollNo;

    private long present;

    private long absent;

    private double percentage;

}