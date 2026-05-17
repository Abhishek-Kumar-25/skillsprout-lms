package com.skillsprout.service.impl;

import com.skillsprout.dto.CourseRequest;
import com.skillsprout.dto.CourseResponse;
import com.skillsprout.entity.Course;
import com.skillsprout.repository.CourseRepository;
import com.skillsprout.service.CourseService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl
        implements CourseService {

    private final CourseRepository
            courseRepository;

    @Override
    public CourseResponse createCourse(
            CourseRequest request
    ) {

        Course course = Course.builder()

                .title(
                        request.getTitle()
                )

                .description(
                        request.getDescription()
                )

                .category(
                        request.getCategory()
                )

                .difficulty(
                        request.getDifficulty()
                )

                .thumbnailUrl(
                        request.getThumbnailUrl()
                )

                .videoUrl(
                        request.getVideoUrl()
                )

                .build();

        Course savedCourse =
                courseRepository.save(course);

        return mapToResponse(
                savedCourse
        );
    }

    @Override
    public Page<CourseResponse> getAllCourses(
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        return courseRepository
                .findAll(pageable)
                .map(this::mapToResponse);
    }

    @Override
    public Page<CourseResponse> searchCourses(
            String keyword,
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        return courseRepository
                .findByTitleContainingIgnoreCase(
                        keyword,
                        pageable
                )
                .map(this::mapToResponse);
    }

    @Override
    public CourseResponse updateCourse(
            Long id,
            CourseRequest request
    ) {

        Course course =
                courseRepository.findById(id)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Course not found"
                                )
                        );

        course.setTitle(
                request.getTitle()
        );

        course.setDescription(
                request.getDescription()
        );

        course.setCategory(
                request.getCategory()
        );

        course.setDifficulty(
                request.getDifficulty()
        );

        course.setThumbnailUrl(
                request.getThumbnailUrl()
        );

        course.setVideoUrl(
                request.getVideoUrl()
        );

        Course updatedCourse =
                courseRepository.save(course);

        return mapToResponse(
                updatedCourse
        );
    }

    @Override
    public void deleteCourse(
            Long id
    ) {

        courseRepository.deleteById(id);
    }

    @Override
    public CourseResponse getCourseById(
            Long id
    ) {

        Course course =
                courseRepository.findById(id)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Course not found"
                                )
                        );

        return mapToResponse(
                course
        );
    }

    private CourseResponse mapToResponse(
            Course course
    ) {

        return CourseResponse.builder()

                .id(
                        course.getId()
                )

                .title(
                        course.getTitle()
                )

                .description(
                        course.getDescription()
                )

                .category(
                        course.getCategory()
                )

                .difficulty(
                        course.getDifficulty()
                )

                .thumbnailUrl(
                        course.getThumbnailUrl()
                )

                .videoUrl(
                        course.getVideoUrl()
                )

                .instructorName(

                        course.getCreatedBy() != null

                                ?

                                course.getCreatedBy()
                                        .getName()

                                :

                                "SkillSprout Team"
                )

                .build();
    }
}