package com.smartattendance.backend.repository;

import com.smartattendance.backend.entity.Student;
import com.smartattendance.backend.entity.AcademicClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByRollNo(String rollNo);
    boolean existsByRollNo(String rollNo);
    List<Student> findByAcademicClass(AcademicClass academicClass);

}