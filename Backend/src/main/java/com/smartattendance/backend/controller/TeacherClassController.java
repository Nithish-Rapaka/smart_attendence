package com.smartattendance.backend.controller;

import com.smartattendance.backend.dto.response.AcademicClassResponse;
import com.smartattendance.backend.service.AcademicClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher/classes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherClassController {

    private final AcademicClassService academicClassService;

    // Get All Classes
    @GetMapping
    public ResponseEntity<List<AcademicClassResponse>> getAllClasses() {

        return ResponseEntity.ok(academicClassService.getAllClasses());
    }

    // Get Class By Id
    @GetMapping("/{id}")
    public ResponseEntity<AcademicClassResponse> getClassById(
            @PathVariable Long id) {

        return ResponseEntity.ok(academicClassService.getClassById(id));
    }
}