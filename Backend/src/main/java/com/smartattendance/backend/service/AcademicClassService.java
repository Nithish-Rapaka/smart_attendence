package com.smartattendance.backend.service;

import com.smartattendance.backend.dto.request.AcademicClassRequest;
import com.smartattendance.backend.dto.response.AcademicClassResponse;

import java.util.List;

public interface AcademicClassService {

    AcademicClassResponse addClass(AcademicClassRequest request);

    List<AcademicClassResponse> getAllClasses();

    AcademicClassResponse getClassById(Long id);

    void deleteClass(Long id);

}