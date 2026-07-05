package com.smartattendance.backend.repository;

import com.smartattendance.backend.entity.AcademicClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AcademicClassRepository
        extends JpaRepository<AcademicClass, Long> {

    Optional<AcademicClass> findByBranchAndYearAndSection(
            String branch,
            Integer year,
            String section
    );

}