package com.skillsprout.service;

import com.skillsprout.dto.EnrollmentResponse;

import java.util.List;

public interface EnrollmentService {

    EnrollmentResponse enrollInCourse(Long courseId);

    List<EnrollmentResponse> getMyEnrollments();
}