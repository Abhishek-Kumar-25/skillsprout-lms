package com.skillsprout.service;

import com.skillsprout.dto.CourseRequest;
import com.skillsprout.dto.CourseResponse;
import org.springframework.data.domain.Page;

public interface CourseService {

    CourseResponse createCourse(
            CourseRequest request
    );

    Page<CourseResponse> getAllCourses(
            int page,
            int size
    );

    Page<CourseResponse> searchCourses(
            String keyword,
            int page,
            int size
    );

    CourseResponse updateCourse(
            Long id,
            CourseRequest request
    );

    void deleteCourse(
            Long id
    );

    CourseResponse getCourseById(Long id);
}