package com.smartattendance.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AttendanceSummaryResponse {

    private int totalStudents;

    private int eligible;

    private int shortage;

    private double averageAttendance;

    private List<StudentReportResponse> students;

}