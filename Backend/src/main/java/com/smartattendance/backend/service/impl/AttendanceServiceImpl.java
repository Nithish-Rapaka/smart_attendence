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

import java.time.LocalDate;
import com.smartattendance.backend.dto.request.AttendanceItemRequest;
import com.smartattendance.backend.entity.AcademicClass;
import com.smartattendance.backend.entity.Attendance;
import com.smartattendance.backend.entity.Student;

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

    private AttendanceResponse map(Attendance attendance) {

        return AttendanceResponse.builder()
                .id(attendance.getId())
                .rollNo(attendance.getStudent().getRollNo())
                .date(attendance.getAttendanceDate())
                .status(attendance.getStatus())
                .build();
    }
}