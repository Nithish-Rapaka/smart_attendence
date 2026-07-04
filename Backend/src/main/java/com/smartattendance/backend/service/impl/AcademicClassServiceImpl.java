package com.smartattendance.backend.service.impl;

import com.smartattendance.backend.dto.request.AcademicClassRequest;
import com.smartattendance.backend.dto.response.AcademicClassResponse;
import com.smartattendance.backend.entity.AcademicClass;
import com.smartattendance.backend.repository.AcademicClassRepository;
import com.smartattendance.backend.service.AcademicClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicClassServiceImpl implements AcademicClassService {

    private final AcademicClassRepository academicClassRepository;

    @Override
    public AcademicClassResponse addClass(AcademicClassRequest request) {

        academicClassRepository.findByBranchAndYearAndSection(
                request.getBranch(),
                request.getYear(),
                request.getSection()
        ).ifPresent(c -> {
            throw new RuntimeException("Class already exists");
        });

        AcademicClass academicClass = AcademicClass.builder()
                .branch(request.getBranch())
                .year(request.getYear())
                .section(request.getSection())
                .build();

        academicClass = academicClassRepository.save(academicClass);

        return mapToResponse(academicClass);
    }

    @Override
    public List<AcademicClassResponse> getAllClasses() {

        return academicClassRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public AcademicClassResponse getClassById(Long id) {

        AcademicClass academicClass = academicClassRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        return mapToResponse(academicClass);
    }

    @Override
    public void deleteClass(Long id) {

        if (!academicClassRepository.existsById(id)) {
            throw new RuntimeException("Class not found");
        }

        academicClassRepository.deleteById(id);
    }

    private AcademicClassResponse mapToResponse(AcademicClass academicClass) {

        return AcademicClassResponse.builder()
                .id(academicClass.getId())
                .branch(academicClass.getBranch())
                .year(academicClass.getYear())
                .section(academicClass.getSection())
                .build();
    }
}