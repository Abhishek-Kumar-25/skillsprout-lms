package com.skillsprout.repository;

import com.skillsprout.entity.Course;
import com.skillsprout.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository
        extends JpaRepository<Course, Long> {

    Page<Course> findAll(
            Pageable pageable
    );

    Page<Course> findByTitleContainingIgnoreCase(

            String keyword,

            Pageable pageable
    );

    boolean existsByIdAndCreatedBy(

            Long courseId,

            User createdBy
    );

    // DELETE USER COURSES

    void deleteByCreatedBy(
            User user
    );
}