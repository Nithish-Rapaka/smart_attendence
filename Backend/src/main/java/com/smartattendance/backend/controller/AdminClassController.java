package com.smartattendance.backend.controller;

import com.smartattendance.backend.dto.request.AcademicClassRequest;
import com.smartattendance.backend.dto.response.AcademicClassResponse;
import com.smartattendance.backend.service.AcademicClassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/classes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminClassController {

    private final AcademicClassService academicClassService;

    // Add Class
    @PostMapping
    public ResponseEntity<AcademicClassResponse> addClass(
            @Valid @RequestBody AcademicClassRequest request) {

        return ResponseEntity.ok(academicClassService.addClass(request));
    }

    // Delete Class
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClass(
            @PathVariable Long id) {

        academicClassService.deleteClass(id);

        return ResponseEntity.ok("Class Deleted Successfully");
    }
}