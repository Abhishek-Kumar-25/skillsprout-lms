package com.skillsprout.repository;

import com.skillsprout.entity.Course;
import com.skillsprout.entity.Enrollment;
import com.skillsprout.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Long> {

    // =========================
    // GET USER ENROLLMENTS
    // =========================

    List<Enrollment> findByUser(
            User user
    );

    // =========================
    // CHECK ENROLLMENT
    // =========================

    boolean existsByUserAndCourse(
            User user,
            Course course
    );

    // =========================
    // DELETE USER ENROLLMENTS
    // =========================

    void deleteByUser(
            User user
    );

    // =========================
    // GET COURSE ENROLLMENTS
    // =========================

    List<Enrollment> findByCourse(
            Course course
    );

    // =========================
    // COUNT COURSE ENROLLMENTS
    // =========================

    long countByCourse(
            Course course
    );
}