package com.skillsprout.controller;

import com.skillsprout.dto.CourseRequest;
import com.skillsprout.dto.CourseResponse;
import com.skillsprout.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    /*
    CREATE COURSE
    ADMIN + INSTRUCTOR
     */
    @PostMapping("/api/instructor/courses")
    public ResponseEntity<CourseResponse>
    createCourse(
            @Valid
            @RequestBody
            CourseRequest request
    ) {

        return ResponseEntity.ok(
                courseService.createCourse(request)
        );
    }

    /*
    GET ALL COURSES
     */
    @GetMapping("/api/user/courses")
    public ResponseEntity<Page<CourseResponse>>
    getAllCourses(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size
    ) {

        return ResponseEntity.ok(
                courseService.getAllCourses(
                        page,
                        size
                )
        );
    }

    /*
    GET COURSE BY ID
     */
    @GetMapping("/api/user/courses/{id}")
    public ResponseEntity<CourseResponse>
    getCourseById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                courseService.getCourseById(id)
        );
    }

    /*
    SEARCH COURSES
     */
    @GetMapping("/api/user/courses/search")
    public ResponseEntity<Page<CourseResponse>>
    searchCourses(

            @RequestParam String keyword,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size
    ) {

        return ResponseEntity.ok(
                courseService.searchCourses(
                        keyword,
                        page,
                        size
                )
        );
    }

    /*
    UPDATE COURSE
     */
    @PutMapping("/api/instructor/courses/{id}")
    public ResponseEntity<CourseResponse>
    updateCourse(

            @PathVariable Long id,

            @Valid
            @RequestBody
            CourseRequest request
    ) {

        return ResponseEntity.ok(
                courseService.updateCourse(
                        id,
                        request
                )
        );
    }

}