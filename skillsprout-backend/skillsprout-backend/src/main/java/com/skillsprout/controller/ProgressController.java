package com.skillsprout.controller;

import com.skillsprout.dto.ProgressResponse;
import com.skillsprout.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @PatchMapping("/progress/{enrollmentId}")
    public ResponseEntity<ProgressResponse>
    updateProgress(

            @PathVariable
            Long enrollmentId,

            @RequestParam
            Integer progress
    ){

        return ResponseEntity.ok(
                progressService.updateProgress(
                        enrollmentId,
                        progress
                )
        );
    }

    @GetMapping("/progress")
    public ResponseEntity<List<ProgressResponse>>
    getMyProgress(){

        return ResponseEntity.ok(
                progressService.getMyProgress()
        );
    }

}