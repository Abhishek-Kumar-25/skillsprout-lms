package com.skillsprout.controller;

import com.skillsprout.entity.Course;
import com.skillsprout.entity.User;

import com.skillsprout.repository.CourseRepository;
import com.skillsprout.repository.EnrollmentRepository;
import com.skillsprout.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor

public class AdminController {

    private final UserRepository
            userRepository;

    private final CourseRepository
            courseRepository;

    private final EnrollmentRepository
            enrollmentRepository;

    // =========================
    // STATS
    // =========================

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats =
                new HashMap<>();

        stats.put(
                "totalUsers",
                userRepository.count()
        );

        stats.put(
                "totalCourses",
                courseRepository.count()
        );

        stats.put(
                "totalEnrollments",
                enrollmentRepository.count()
        );

        return stats;
    }

    // =========================
    // USERS
    // =========================

    @GetMapping("/users")
    public List<User> getUsers() {

        return userRepository.findAll();
    }

    // DELETE USER

    @Transactional

    @DeleteMapping("/users/{id}")
    public void deleteUser(
            @PathVariable Long id
    ) {

        User user =
                userRepository.findById(id)
                        .orElseThrow();

        // DELETE USER ENROLLMENTS

        enrollmentRepository.deleteByUser(user);

        // DELETE USER COURSES

        courseRepository.deleteByCreatedBy(user);

        // DELETE USER

        userRepository.delete(user);
    }

    // =========================
    // COURSES
    // =========================

    @GetMapping("/courses")
    public List<Course> getCourses() {

        return courseRepository.findAll();
    }

    // CREATE COURSE

    @PostMapping("/courses")
    public Course createCourse(
            @RequestBody Course course
    ) {

        return courseRepository.save(course);
    }

    // UPDATE COURSE

    @PutMapping("/courses/{id}")
    public Course updateCourse(

            @PathVariable Long id,

            @RequestBody Course updatedCourse
    ) {

        Course course =
                courseRepository.findById(id)
                        .orElseThrow();

        course.setTitle(
                updatedCourse.getTitle()
        );

        course.setDescription(
                updatedCourse.getDescription()
        );

        course.setCategory(
                updatedCourse.getCategory()
        );

        course.setDifficulty(
                updatedCourse.getDifficulty()
        );

        course.setThumbnailUrl(
                updatedCourse.getThumbnailUrl()
        );

        course.setVideoUrl(
                updatedCourse.getVideoUrl()
        );

        return courseRepository.save(course);
    }

    // DELETE COURSE

    @DeleteMapping("/courses/{id}")
    public void deleteCourse(
            @PathVariable Long id
    ) {

        courseRepository.deleteById(id);
    }
}