package com.smartattendance.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "academic_classes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcademicClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String branch;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String section;

    @OneToMany(mappedBy = "academicClass",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Student> students;
}