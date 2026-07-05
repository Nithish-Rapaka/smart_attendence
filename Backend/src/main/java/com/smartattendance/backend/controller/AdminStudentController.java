package com.smartattendance.backend.controller;

import com.smartattendance.backend.dto.request.BulkStudentRequest;
import com.smartattendance.backend.dto.request.StudentRequest;
import com.smartattendance.backend.dto.response.StudentResponse;
import com.smartattendance.backend.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminStudentController {

    private final StudentService studentService;

    // Add Single Student
    @PostMapping
    public ResponseEntity<StudentResponse> addStudent(
            @Valid @RequestBody StudentRequest request) {

        return ResponseEntity.ok(studentService.addStudent(request));
    }

    // Bulk Generate Students
    @PostMapping("/bulk")
    public ResponseEntity<List<StudentResponse>> bulkGenerateStudents(
            @Valid @RequestBody BulkStudentRequest request) {

        return ResponseEntity.ok(studentService.bulkGenerateStudents(request));
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok("Student Deleted Successfully");
    }

    // Delete All Students of a Class
    @DeleteMapping("/class/{classId}")
    public ResponseEntity<String> deleteStudentsByClass(
            @PathVariable Long classId) {

        studentService.deleteStudentsByClass(classId);

        return ResponseEntity.ok("All Students Deleted Successfully");
    }
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long id,
            @RequestBody StudentRequest request) {

        return ResponseEntity.ok(studentService.updateStudent(id, request));
    }
}