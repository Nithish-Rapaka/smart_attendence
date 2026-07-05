package com.smartattendance.backend.service.impl;

import com.smartattendance.backend.dto.response.AbsentGroupResponse;
import com.smartattendance.backend.dto.response.DashboardResponse;
import com.smartattendance.backend.entity.Attendance;
import com.smartattendance.backend.enums.AttendanceStatus;
import com.smartattendance.backend.repository.AcademicClassRepository;
import com.smartattendance.backend.repository.AttendanceRepository;
import com.smartattendance.backend.repository.StudentRepository;
import com.smartattendance.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final StudentRepository studentRepository;
    private final AcademicClassRepository academicClassRepository;
    private final AttendanceRepository attendanceRepository;

    @Override
    public DashboardResponse getDashboardStats() {

        LocalDate today = LocalDate.now();

        long presentToday = attendanceRepository.countByAttendanceDateAndStatus(
                today,
                AttendanceStatus.PRESENT
        );

        long absentToday = attendanceRepository.countByAttendanceDateAndStatus(
                today,
                AttendanceStatus.ABSENT
        );

        Map<String, List<Attendance>> groupedAttendance =
                attendanceRepository
                        .findByAttendanceDateAndStatus(today, AttendanceStatus.ABSENT)
                        .stream()
                        .collect(Collectors.groupingBy(attendance -> {

                            var academicClass = attendance.getStudent().getAcademicClass();

                            return academicClass.getBranch()
                                    + "-"
                                    + academicClass.getYear()
                                    + "-"
                                    + academicClass.getSection();

                        }));

        List<AbsentGroupResponse> absentGroups =
                groupedAttendance.entrySet()
                        .stream()
                        .map(entry -> {

                            Attendance first = entry.getValue().get(0);

                            var academicClass = first.getStudent().getAcademicClass();

                            List<String> rollNumbers =
                                    entry.getValue()
                                            .stream()
                                            .map(attendance -> {
                                                String rollNo = attendance.getStudent().getRollNo();
                                                return rollNo.substring(rollNo.length() - 2);
                                            })
                                            .sorted()
                                            .toList();

                            return AbsentGroupResponse.builder()
                                    .branch(academicClass.getBranch())
                                    .year(academicClass.getYear())
                                    .section(academicClass.getSection())
                                    .rollNumbers(rollNumbers)
                                    .build();

                        })
                        .toList();

        return DashboardResponse.builder()
                .totalStudents(studentRepository.count())
                .totalClasses(academicClassRepository.count())
                .presentToday(presentToday)
                .absentToday(absentToday)
                .absentGroups(absentGroups)
                .build();
    }
}