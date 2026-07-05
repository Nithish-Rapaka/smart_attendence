package com.smartattendance.backend.service.impl;

import com.smartattendance.backend.dto.request.AttendanceRequest;
import com.smartattendance.backend.dto.response.AttendanceResponse;
import com.smartattendance.backend.entity.Attendance;
import com.smartattendance.backend.repository.AcademicClassRepository;
import com.smartattendance.backend.repository.AttendanceRepository;
import com.smartattendance.backend.repository.StudentRepository;
import com.smartattendance.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.smartattendance.backend.dto.response.AttendanceReportResponse;
import com.smartattendance.backend.dto.response.StudentAttendanceResponse;
import com.smartattendance.backend.enums.AttendanceStatus;
import java.time.LocalDate;
import com.smartattendance.backend.dto.request.AttendanceItemRequest;
import com.smartattendance.backend.entity.AcademicClass;
import com.smartattendance.backend.entity.Student;
import com.smartattendance.backend.dto.response.AttendanceSummaryResponse;
import com.smartattendance.backend.dto.response.StudentReportResponse;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final AcademicClassRepository academicClassRepository;

    @Override
    public List<AttendanceResponse> saveAttendance(AttendanceRequest request) {

        AcademicClass academicClass = academicClassRepository.findById(request.getAcademicClassId())
                .orElseThrow(() -> new RuntimeException("Class Not Found"));

        List<Attendance> attendanceList = new ArrayList<>();

        for (AttendanceItemRequest item : request.getAttendance()) {

            Student student = studentRepository.findById(item.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student Not Found"));

            // Prevent duplicate attendance
            if (attendanceRepository.existsByStudentAndAttendanceDate(student, request.getDate())) {
                continue;
            }

            Attendance attendance = Attendance.builder()
                    .student(student)
                    .attendanceDate(request.getDate())
                    .status(item.getStatus())
                    .build();

            attendanceList.add(attendance);
        }

        List<Attendance> savedAttendance = attendanceRepository.saveAll(attendanceList);

        return savedAttendance.stream()
                .map(this::map)
                .toList();
    }

    @Override
    public List<AttendanceResponse> getAttendanceByDate(LocalDate date) {

        return attendanceRepository.findByAttendanceDate(date)
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public List<AttendanceResponse> getAttendanceByStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));

        return attendanceRepository.findByStudent(student)
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public void deleteAttendance(Long id) {

        if (!attendanceRepository.existsById(id)) {
            throw new RuntimeException("Attendance Not Found");
        }

        attendanceRepository.deleteById(id);
    }

    @Override
    public double calculateAttendancePercentage(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));

        List<Attendance> attendanceList =
                attendanceRepository.findByStudent(student);

        if (attendanceList.isEmpty()) {
            return 0;
        }

        long presentCount = attendanceList.stream()
                .filter(a -> a.getStatus().name().equals("PRESENT"))
                .count();

        return (presentCount * 100.0) / attendanceList.size();
    }
    @Override
    public AttendanceReportResponse getAttendanceReport(Long academicClassId,
                                                        LocalDate date) {

        List<Attendance> attendanceList =
                attendanceRepository.findByAttendanceDateAndStudent_AcademicClass_Id(
                        date,
                        academicClassId
                );

        int totalStudents = attendanceList.size();

        int present = (int) attendanceList.stream()
                .filter(a -> a.getStatus() == AttendanceStatus.PRESENT)
                .count();

        int absent = totalStudents - present;

        double percentage =
                totalStudents == 0
                        ? 0
                        : (present * 100.0) / totalStudents;

        List<StudentAttendanceResponse> students =
                attendanceList.stream()
                        .map(a -> StudentAttendanceResponse.builder()
                                .studentId(a.getStudent().getId())
                                .rollNo(a.getStudent().getRollNo())
                                .status(a.getStatus())
                                .build())
                        .toList();

        return AttendanceReportResponse.builder()
                .totalStudents(totalStudents)
                .present(present)
                .absent(absent)
                .attendancePercentage(percentage)
                .students(students)
                .build();
    }

    @Override
    public AttendanceSummaryResponse getClassAttendanceSummary(Long academicClassId) {

        List<Attendance> attendanceList =
                attendanceRepository.findByStudent_AcademicClass_Id(academicClassId);

        Map<Student, List<Attendance>> groupedAttendance =
                attendanceList.stream()
                        .collect(Collectors.groupingBy(Attendance::getStudent));

        List<StudentReportResponse> students = groupedAttendance.entrySet()
                .stream()
                .map(entry -> {

                    Student student = entry.getKey();
                    List<Attendance> records = entry.getValue();

                    long present = records.stream()
                            .filter(a -> a.getStatus() == AttendanceStatus.PRESENT)
                            .count();

                    long absent = records.size() - present;

                    double percentage =
                            records.isEmpty()
                                    ? 0
                                    : (present * 100.0) / records.size();

                    return StudentReportResponse.builder()
                            .studentId(student.getId())
                            .rollNo(student.getRollNo())
                            .present(present)
                            .absent(absent)
                            .percentage(percentage)
                            .build();
                })
                .toList();

        int eligible = (int) students.stream()
                .filter(s -> s.getPercentage() >= 75)
                .count();

        int shortage = students.size() - eligible;

        double averageAttendance =
                students.stream()
                        .mapToDouble(StudentReportResponse::getPercentage)
                        .average()
                        .orElse(0);

        return AttendanceSummaryResponse.builder()
                .totalStudents(students.size())
                .eligible(eligible)
                .shortage(shortage)
                .averageAttendance(averageAttendance)
                .students(students)
                .build();
    }
    private AttendanceResponse map(Attendance attendance) {

        return AttendanceResponse.builder()
                .id(attendance.getId())
                .studentId(attendance.getStudent().getId())
                .rollNo(attendance.getStudent().getRollNo())
                .date(attendance.getAttendanceDate())
                .status(attendance.getStatus())
                .build();
    }

    @Override
    public List<AttendanceResponse> updateAttendance(AttendanceRequest request) {

        List<AttendanceResponse> response = new ArrayList<>();

        for (AttendanceItemRequest item : request.getAttendance()) {

            Student student = studentRepository.findById(item.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student Not Found"));

            Attendance attendance = attendanceRepository
                    .findByStudentAndAttendanceDate(student, request.getDate())
                    .orElseThrow(() -> new RuntimeException(
                            "Attendance Not Found"));

            attendance.setStatus(item.getStatus());

            attendanceRepository.save(attendance);

            response.add(map(attendance));
        }

        return response;
    }
    @Override
    public List<AttendanceResponse> getAttendanceByClassAndDate(
            Long classId,
            LocalDate date) {

        return attendanceRepository
                .findByStudent_AcademicClass_IdAndAttendanceDate(classId, date)
                .stream()
                .map(this::map)
                .toList();
    }
}