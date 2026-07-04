package com.smartattendance.backend.repository;

import com.smartattendance.backend.entity.Attendance;
import com.smartattendance.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Get all attendance records of a student
    List<Attendance> findByStudent(Student student);

    // Get attendance by date
    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    // Check if attendance already exists for a student on a particular date
    boolean existsByStudentAndAttendanceDate(Student student, LocalDate attendanceDate);

}