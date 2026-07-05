package com.smartattendance.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AbsentGroupResponse {

    private String branch;

    private Integer year;

    private String section;

    private List<String> rollNumbers;
}