package com.smartattendance.backend.service.impl;

import com.smartattendance.backend.dto.request.BulkStudentRequest;
import com.smartattendance.backend.dto.request.StudentRequest;
import com.smartattendance.backend.dto.response.StudentResponse;
import com.smartattendance.backend.entity.AcademicClass;
import com.smartattendance.backend.entity.Student;
import com.smartattendance.backend.repository.AcademicClassRepository;
import com.smartattendance.backend.repository.StudentRepository;
import com.smartattendance.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final AcademicClassRepository classRepository;

    @Override
    public StudentResponse addStudent(StudentRequest request) {

        if (studentRepository.existsByRollNo(request.getRollNo())) {
            throw new RuntimeException("Roll Number already exists");
        }

        AcademicClass academicClass = classRepository.findById(request.getAcademicClassId())
                .orElseThrow(() -> new RuntimeException("Class Not Found"));

        Student student = Student.builder()
                .rollNo(request.getRollNo())
                .academicClass(academicClass)
                .build();

        student = studentRepository.save(student);

        return map(student);
    }
    @Override
    public StudentResponse updateStudent(Long id, StudentRequest request) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        AcademicClass academicClass = classRepository.findById(request.getAcademicClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        student.setRollNo(request.getRollNo());
        student.setAcademicClass(academicClass);

        studentRepository.save(student);

        return map(student);
    }
    @Override
    public List<StudentResponse> bulkGenerateStudents(BulkStudentRequest request) {

        AcademicClass academicClass = classRepository.findById(request.getAcademicClassId())
                .orElseThrow(() -> new RuntimeException("Class Not Found"));

        List<Student> students = new ArrayList<>();

        for (int i = request.getStartNumber(); i <= request.getEndNumber(); i++) {

            String rollNo;

            if (request.getPrefix().endsWith("A")
                    || request.getPrefix().endsWith("B")
                    || request.getPrefix().endsWith("C")) {

                // Section format: A0, A1, A2...
                rollNo = request.getPrefix() + i;

            } else {

                // Numeric format: 01, 02...99
                rollNo = request.getPrefix() + String.format("%02d", i);
            }

            if (!studentRepository.existsByRollNo(rollNo)) {

                students.add(
                        Student.builder()
                                .rollNo(rollNo)
                                .academicClass(academicClass)
                                .build()
                );
            }
        }

        List<Student> saved = studentRepository.saveAll(students);

        return saved.stream()
                .map(this::map)
                .toList();
    }

    @Override
    public List<StudentResponse> getAllStudents() {

        return studentRepository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public List<StudentResponse> getStudentsByClass(Long classId) {

        AcademicClass academicClass = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class Not Found"));

        return studentRepository.findByAcademicClass(academicClass)
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public void deleteStudentsByClass(Long classId) {

        AcademicClass academicClass = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class Not Found"));

        List<Student> students = studentRepository.findByAcademicClass(academicClass);

        studentRepository.deleteAll(students);
    }

    private StudentResponse map(Student student) {

        return StudentResponse.builder()
                .id(student.getId())
                .rollNo(student.getRollNo())
                .academicClassId(student.getAcademicClass().getId())
                .branch(student.getAcademicClass().getBranch())
                .year(student.getAcademicClass().getYear())
                .section(student.getAcademicClass().getSection())
                .build();
    }

}