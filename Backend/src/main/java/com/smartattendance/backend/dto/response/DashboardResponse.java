package com.smartattendance.backend.dto.response;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.smartattendance.backend.dto.response.AbsentGroupResponse;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {
    private long totalStudents;
    private long totalClasses;
    private long presentToday;
    private long absentToday;
    private List<AbsentGroupResponse> absentGroups;

}