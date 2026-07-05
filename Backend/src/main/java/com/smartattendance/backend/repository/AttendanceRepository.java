package com.smartattendance.backend.repository;
import java.time.LocalDate;
import com.smartattendance.backend.enums.AttendanceStatus;
import com.smartattendance.backend.entity.Attendance;
import com.smartattendance.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {


    // Get all attendance records of a student
    List<Attendance> findByStudent(Student student);
    long countByAttendanceDateAndStatus(
            LocalDate attendanceDate,
            AttendanceStatus status
    );
    // Get attendance by date
    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    // Check if attendance already exists for a student on a particular date
    boolean existsByStudentAndAttendanceDate(Student student, LocalDate attendanceDate);
    List<Attendance> findByAttendanceDateAndStudent_AcademicClass_Id(
            LocalDate attendanceDate,
            Long academicClassId
    );
    List<Attendance> findByStudent_AcademicClass_Id(Long academicClassId);
    Optional<Attendance> findByStudentAndAttendanceDate(
            Student student,
            LocalDate attendanceDate
    );
    List<Attendance> findByStudent_AcademicClass_IdAndAttendanceDate(
            Long classId,
            LocalDate attendanceDate
    );
    List<Attendance> findByAttendanceDateAndStatus(
            LocalDate attendanceDate,
            AttendanceStatus status
    );
}