package com.smartattendance.backend.controller;

import com.smartattendance.backend.dto.request.StudentRequest;
import com.smartattendance.backend.dto.response.StudentResponse;
import com.smartattendance.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherStudentController {

    private final StudentService studentService;

    // Get All Students
    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {

        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // Get Students By Class
    @GetMapping("/class/{classId}")
    public ResponseEntity<List<StudentResponse>> getStudentsByClass(
            @PathVariable Long classId) {

        return ResponseEntity.ok(studentService.getStudentsByClass(classId));
    }
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long id,
            @RequestBody StudentRequest request) {

        return ResponseEntity.ok(studentService.updateStudent(id, request));
    }

}