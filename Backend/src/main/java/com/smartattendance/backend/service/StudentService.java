package com.smartattendance.backend.service;

import com.smartattendance.backend.dto.request.BulkStudentRequest;
import com.smartattendance.backend.dto.request.StudentRequest;
import com.smartattendance.backend.dto.response.StudentResponse;

import java.util.List;

public interface StudentService {

    StudentResponse addStudent(StudentRequest request);

    List<StudentResponse> getAllStudents();

    List<StudentResponse> getStudentsByClass(Long classId);

    List<StudentResponse> bulkGenerateStudents(BulkStudentRequest request);

    void deleteStudent(Long id);

    void deleteStudentsByClass(Long classId);
}