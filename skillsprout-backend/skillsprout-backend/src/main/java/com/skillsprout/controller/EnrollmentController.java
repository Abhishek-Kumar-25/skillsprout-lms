package com.skillsprout.controller;

import com.skillsprout.dto.EnrollmentResponse;
import com.skillsprout.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<EnrollmentResponse>
    enrollInCourse(
            @PathVariable Long courseId
    ) {

        return ResponseEntity.ok(
                enrollmentService.enrollInCourse(courseId)
        );
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<EnrollmentResponse>>
    getMyEnrollments() {

        return ResponseEntity.ok(
                enrollmentService.getMyEnrollments()
        );
    }
}