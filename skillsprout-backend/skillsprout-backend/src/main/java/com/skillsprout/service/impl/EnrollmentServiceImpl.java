package com.skillsprout.service.impl;

import com.skillsprout.dto.EnrollmentResponse;

import com.skillsprout.entity.Course;
import com.skillsprout.entity.Enrollment;
import com.skillsprout.entity.User;

import com.skillsprout.enums.EnrollmentStatus;

import com.skillsprout.exception.ResourceAlreadyExistsException;
import com.skillsprout.exception.ResourceNotFoundException;

import com.skillsprout.repository.CourseRepository;
import com.skillsprout.repository.EnrollmentRepository;
import com.skillsprout.repository.UserRepository;

import com.skillsprout.service.EmailService;
import com.skillsprout.service.EnrollmentService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class EnrollmentServiceImpl
        implements EnrollmentService {

    private final EnrollmentRepository
            enrollmentRepository;

    private final CourseRepository
            courseRepository;

    private final UserRepository
            userRepository;

    private final EmailService
            emailService;

    // =========================
    // ENROLL IN COURSE
    // =========================

    @Override
    public EnrollmentResponse enrollInCourse(
            Long courseId
    ) {

        Authentication authentication =

                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        // GET USER

        User user =
                userRepository.findByEmail(email)

                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );

        // GET COURSE

        Course course =
                courseRepository.findById(courseId)

                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "Course not found"
                                )
                        );

        // CHECK ALREADY ENROLLED

        boolean alreadyEnrolled =

                enrollmentRepository
                        .existsByUserAndCourse(
                                user,
                                course
                        );

        if (alreadyEnrolled) {

            throw new ResourceAlreadyExistsException(

                    "You are already enrolled in this course"
            );
        }

        // CREATE ENROLLMENT

        Enrollment enrollment =
                Enrollment.builder()

                        .user(user)

                        .course(course)

                        .progress(0)

                        .status(
                                EnrollmentStatus.ACTIVE
                        )

                        .build();

        // SAVE ENROLLMENT

        Enrollment savedEnrollment =

                enrollmentRepository.save(
                        enrollment
                );

        // SEND ENROLLMENT EMAIL

        emailService.sendEnrollmentEmail(

                user.getEmail(),

                course.getTitle()
        );

        // RETURN RESPONSE

        return mapToResponse(
                savedEnrollment
        );
    }

    // =========================
    // GET MY ENROLLMENTS
    // =========================

    @Override
    public List<EnrollmentResponse>
    getMyEnrollments() {

        Authentication authentication =

                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)

                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );

        return enrollmentRepository
                .findByUser(user)

                .stream()

                .map(this::mapToResponse)

                .toList();
    }

    // =========================
    // MAP RESPONSE
    // =========================

    private EnrollmentResponse mapToResponse(
            Enrollment enrollment
    ) {

        return EnrollmentResponse.builder()

                .enrollmentId(
                        enrollment.getId()
                )

                .courseTitle(
                        enrollment.getCourse()
                                .getTitle()
                )

                .progress(
                        enrollment.getProgress()
                )

                .status(
                        enrollment.getStatus()
                                .name()
                )

                .build();
    }
}